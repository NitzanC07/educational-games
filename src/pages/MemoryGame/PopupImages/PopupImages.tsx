import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

interface PopupImagesProps {
  continuePlay: () => void;
  content: string;
  buttonText: string;
  imageItems?: {
    id: number;
    imgUrl: string;
    cardName: string;
    description: string;
    isVisible: boolean;
    imageType: string;
  }[];
}
function PopupImages({
  continuePlay,
  content,
  buttonText,
  imageItems,
}: PopupImagesProps) {
  console.log(imageItems);

  return (
    <Flex
      pos={"fixed"}
      top={0}
      left={0}
      bottom={0}
      right={0}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={2}
      width={"100%"}
      height={"100%"}
      bgColor={"#000000aa"}
    >
      <Flex
        flexDirection={"column"}
        width={450}
        bgColor={"#fff"}
        border={"4px solid #244F98"}
        borderRadius={10}
        justifyContent={"center"}
        p={5}
      >
        <Text mb={5}>{content}</Text>
        {/* <Flex justifyContent={"space-between"} mb={5}>
          <Box>
            <Text>{imageItems[0].description}</Text>
            <Image src={imageItems[0].imgUrl} alt={imageItems[0].cardName} width={180} />
          </Box>
          <Box>
            <Text>חילזון ב-AI</Text>
            <Image src={"/images/memory-game/snail-on-leaves-ai.jpeg"} alt="image" width={180} />
          </Box>
        </Flex> */}
        <Button onClick={continuePlay} colorScheme="blue">
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
}

export default PopupImages;
