import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cards from "./data/memory-game.json";
import ImageCard from "./ImageCard";

function MemoryGame() {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [isShowCard, setIsShowCard] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const [isVisible, setIsVisible] = useState(Array(cards.length).fill(false));
  const [firstCard, setFirstCard] = useState(-1);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  // const [openPopup, setOpenPopup] = useState(false);

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
              console.log(isVisible);
              
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
      setIsVisible([
        ...isVisible,
        (isVisible[firstCard] = true),
        (isVisible[secondCard] = true),
      ]);
      // setOpenPopup(true);
    }
  };

  return (
    <section>
      <Heading>משחק זכרון בנושא עצים</Heading>
      <Text>נסיונות: {tries} | פספוסים: {tries - score} | התאמות: {score} | ניקוד: {score / tries}</Text>
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
    </section>
  );
}

export default MemoryGame;
