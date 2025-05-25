import { Card, Flex, Image, Text } from "@chakra-ui/react";

interface ImageCardProps {
  selectedCardId: number;
  item: {
    id: number;
    imgUrl: string;
    cardName: string;
    description: string;
    isVisible: boolean;
    imageType: string;
  };
  isVisible: boolean;
  isShowCard: boolean[];
  showCard: (cardName: string, selectedCardId: number) => void;
}

function ImageCard({
  selectedCardId,
  item,
  isShowCard,
  showCard,
}: ImageCardProps) {
  return (
    <Card.Root
      key={selectedCardId}
      width={["100px", "165px"]}
      overflow={"hidden"}
      cursor={"pointer"}
      border={"4px solid #176B87"}
      m={5}
      boxShadow={"-5px -5px 6px rgba(0, 0, 0, 0.25)"}
      pos={"relative"}
      visibility={item.isVisible ? "visible" : "hidden"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        pos={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgColor={"#176B87"}
        zIndex={1}
        onClick={() => showCard(item.cardName, selectedCardId)}
        opacity={isShowCard[selectedCardId] ? 0 : 1}
        transition={"all 0.5s ease-in-out"}
        color={"#EEF5FF"}
      />
      <Image src={item.imgUrl} alt={item.cardName} />
      <Text pos={"absolute"} bottom={0} left={0} color={"#EEF5FF"}>
        {item.imageType}
      </Text>
    </Card.Root>
  );
}

export default ImageCard;
