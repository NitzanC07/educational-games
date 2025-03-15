import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cards from "./data/memory-game.json";
import ImageCard from "./ImageCard";
import PopupImages from "./PopupImages/PopupImages";

function MemoryGame() {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [isShowCard, setIsShowCard] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const isVisible = true;
  const [firstCard, setFirstCard] = useState(-1);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setShuffledCards(cards.sort(() => Math.random() - 0.5));
  }, []);

  const showCard = (cardName: string, selectedCardId: number) => {
    if (
      firstCard === selectedCardId ||
      isShowCard.filter((item) => item).length > 1
    )
      return;
    setIsShowCard((prev: boolean[]) => {
      return prev.map((item, i) => {
        if (firstCard === -1) {
          // Selected the first card
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
      shuffledCards[firstCard].cardName === shuffledCards[secondCard].cardName
    ) {
      setScore(score + 1);
      setOpenPopup(true);
      shuffledCards[firstCard].isVisible = false;
      shuffledCards[secondCard].isVisible = false;
    }
  };

  const continuePlay = () => {
    setOpenPopup(false);
  };

  return (
    <section>
      <Heading>משחק זכרון בנושא עצים</Heading>
      <Text>
        נסיונות: {tries} | פספוסים: {tries - score} | התאמות: {score} | ניקוד: {tries === 0 ? 0 : Math.round((score / tries) * 100)}
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
      {
        openPopup && (
          <PopupImages
            continuePlay={continuePlay}
            content={"כל הכבוד צמד קלפים תואמים!"}
            buttonText={"להמשיך לשחק"}
            // imageItems={[shuffledCards[firstCard]]}
          />
        )
      }
    </section>
  );
}

export default MemoryGame;
