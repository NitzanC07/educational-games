import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cards from "./data/memory-game.json";
import ImageCard from "./ImageCard";
import PopupImages from "./PopupImages/PopupImages";
import PopupSuccess from "./PopupSuccess/PopupSuccess";

function MemoryGame() {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [isShowCard, setIsShowCard] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const isVisible = true;
  const [firstCard, setFirstCard] = useState(-1);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [openMatchPopup, setOpenMatchPopup] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bothCardsMatch, setBothCardsMatch] = useState<
    {
      id: number;
      imgUrl: string;
      cardName: string;
      description: string;
      isVisible: boolean;
      imageType: string;
    }[]
  >([]);

  useEffect(() => {
    setShuffledCards(cards.sort(() => Math.random() - 0.5));
  }, [isGameOver]);

  const showCard = (cardName: string, selectedCardId: number) => {
    if (
      // Prevent the user from selecting the same card twice.
      firstCard === selectedCardId ||
      isShowCard.filter((item) => item).length > 1
    )
      return;
    setIsShowCard((prev: boolean[]) => {
      return prev.map((item, i) => {
        if (firstCard === -1) {
          // Selected the first card.
          if (i === selectedCardId) {
            setFirstCard(i);
            return !item;
          } else {
            return item;
          }
        } else {
          // Selected the second card.
          if (i === selectedCardId) {
            setTimeout(() => {
              checkIsMatch(i);
              setTries(tries + 1);
              setFirstCard(-1);
              setIsShowCard(Array(cards.length).fill(false));
            }, 2000);
            return !item;
          } else {
            return item;
          }
        }
      });
    });
  };

  const checkIsMatch = (secondCard: number) => {
    if (
      // Check if the cards match.
      shuffledCards[firstCard].cardName === shuffledCards[secondCard].cardName
    ) {
      // If yes, there is a good match.
      setScore(score + 1);
      setBothCardsMatch([shuffledCards[firstCard], shuffledCards[secondCard]]);
      setOpenMatchPopup(true);
      shuffledCards[firstCard].isVisible = false;
      shuffledCards[secondCard].isVisible = false;
    }
  };

  const continuePlay = () => {
    setTimeout(() => {
      if (score === shuffledCards.length / 2) {
        setIsGameOver(true);
      }
    }, 500);
    setOpenMatchPopup(false);
  };

  const restartGame = () => {
    setIsShowCard(Array(cards.length).fill(false));
    setScore(0);
    setTries(0);
    setFirstCard(-1);
    setBothCardsMatch([]);
    shuffledCards.map((card) => (card.isVisible = true));
    setIsGameOver(false);
  };

  return (
    <section>
      <Heading>משחק זכרון בנושא עצים</Heading>
      <Text>
        נסיונות: {tries} | פספוסים: {tries - score} | התאמות: {score} | ניקוד:{" "}
        {tries === 0 ? 0 : Math.round((score / tries) * 100)}
      </Text>
      <Flex flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
        {cards.map((card, index) => (
          <ImageCard
            key={index}
            selectedCardId={index}
            item={card}
            isVisible={isVisible}
            isShowCard={isShowCard}
            showCard={() => showCard(card.cardName, index)}
          />
        ))}
      </Flex>
      {openMatchPopup && (
        <PopupImages
          continuePlay={continuePlay}
          content={"כל הכבוד מצאת צמד קלפים תואמים!"}
          buttonText={"להמשיך לשחק"}
          imageItems={bothCardsMatch}
        />
      )}
      {isGameOver && (
        <PopupSuccess
          restartGame={restartGame}
          content="כל הכבוד! מצאת את כל הצמדים."
          score={score}
          tries={tries}
        />
      )}
    </section>
  );
}

export default MemoryGame;
