import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cards from "./data/memory-game.json";
import ImageCard from "./ImageCard/ImageCard";
import PopupImages from "./PopupImages/PopupImages";
import PopupSuccess from "./PopupSuccess/PopupSuccess";
import { log } from "console";

function MemoryGame() {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [isShowCard, setIsShowCard] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const isVisible = true;
  const [firstCard, setFirstCard] = useState(-1);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [openMatchPopup, setOpenMatchPopup] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bothCardsMatch, setBothCardsMatch] = useState<
    {
      id: number;
      imgUrl: string;
      cardName: string;
      cardIdMatch: number;
      description: string;
      isVisible: boolean;
      imageType: string;
    }[]
  >([]);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    setShuffledCards(selectSixCouples());
  }, [isGameOver]);

  const selectSixCouples = () => {
    const couples = [];
    const allCards = [...cards];

    // Loop until we have 6 couples
    while (couples.length < 12) {
      const randomIndex1 = Math.floor(Math.random() * allCards.length);
      const card1 = allCards[randomIndex1];
      const card2 = allCards.find((card) => card.id === card1.cardIdMatch);

      if (card2) {
        couples.push(card1, card2);
        allCards.splice(randomIndex1, 1);
        allCards.splice(allCards.indexOf(card2), 1);
      }
    }

    // Shuffle the selected cards
    const shuffledCouples = [...couples].sort(() => Math.random() - 0.5);

    return shuffledCouples;
  };

  const showCard = (cardName: string, selectedCardId: number) => {
    if (tries === 0) setIsTimerRunning(true);
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
            }, 1200);
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
        setIsTimerRunning(false);
        setIsGameOver(true);
      }
    }, 300);
    setOpenMatchPopup(false);
  };

  const restartGame = () => {
    setIsShowCard(Array(cards.length).fill(false));
    setScore(0);
    setTries(0);
    setSeconds(0);
    setFirstCard(-1);
    setBothCardsMatch([]);
    cards.map((card) => (card.isVisible = true));
    setIsGameOver(false);
  };

  return (
    <section>
      <Heading>משחק זכרון בנושא עצים</Heading>
      <Text>
        נסיונות: {tries} | פספוסים: {tries - score} | התאמות: {score} | זמן:{" "}
        {`${Math.floor(seconds / 60)}`.padStart(2, "0")}:
        {`${seconds % 60}`.padStart(2, "0")}
      </Text>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
        width={["100%"]}
        maxW={"1024px"}
        mx={"auto"}
        borderRadius={10}
      >
        {shuffledCards.map((card, index) => (
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
          buttonText={score !== 6 ? "להמשיך לשחק": "סיום משחק"}
          imageItems={bothCardsMatch}
        />
      )}
      {isGameOver && (
        <PopupSuccess
          restartGame={restartGame}
          content="כל הכבוד! מצאת את כל הצמדים."
          score={score}
          tries={tries}
          seconds={seconds}
        />
      )}
    </section>
  );
}

export default MemoryGame;
