import { Card, Flex, Image, Text } from "@chakra-ui/react";

interface ImageCardProps {
  selectedCardId: number;
  item: {
    id: number;
    imgUrl: string;
    cardName: string;
    description: string;
    isVisible: boolean;
  };
  isVisible: boolean;
  isShowCard: boolean[];
  showCard: (cardName: string, selectedCardId: number) => void;
}

function ImageCard({
  selectedCardId,
  item,
  isVisible,
  isShowCard,
  showCard,
}: ImageCardProps) {
  return (
    <Card.Root
      key={selectedCardId}
      width={["100px", "150px", "200px", "250px"]}
      overflow={"hidden"}
      cursor={"pointer"}
      border={"4px solid #244F98"}
      m={5}
      boxShadow={"-5px -5px 6px rgba(0, 0, 0, 0.25)"}
      pos={"relative"}
      visibility={item.isVisible ? "visible": "hidden"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        pos={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgColor={"#133E87"}
        zIndex={1}
        opacity={isShowCard[selectedCardId] ? 0 : 1}
        onClick={() => showCard(item.cardName, selectedCardId)}
        transition={"all 0.5s ease-in-out"}
        color={"#244F98"}
      />
      <Image src={item.imgUrl} alt={item.cardName} />
      <Text pos={"absolute"} bottom={0} left={0}>
        צילום
      </Text>
    </Card.Root>
  );
}

export default ImageCard;
