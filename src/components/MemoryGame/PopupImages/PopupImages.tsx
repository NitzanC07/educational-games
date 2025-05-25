import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface PopupImagesProps {
  continuePlay: () => void;
  content: string;
  buttonText: string;
  imageItems?:
    | {
        id: number;
        imgUrl: string;
        cardName: string;
        description: string;
        isVisible: boolean;
        imageType: string;
      }[]
    | undefined[];
}
function PopupImages({
  continuePlay,
  content,
  buttonText,
  imageItems,
}: PopupImagesProps) {
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
        border={"4px solid #86B6F6"}
        borderRadius={10}
        justifyContent={"center"}
        p={5}
      >
        <Heading mb={5} color={"#176B87"}>
          {content}
        </Heading>
        <Flex justifyContent={"space-between"} mb={5}>
          {imageItems &&
            imageItems.map((item, i) => (
              <Box key={i}>
                <Image
                  key={item?.id}
                  src={item?.imgUrl}
                  alt={item?.cardName}
                  width={180}
                  mb={5}
                  border={"4px solid #86B6F6"}
                  borderRadius={7}
                  boxShadow={"3px 3px 5px rgba(0, 0, 0, 0.25)"}
                />
                <Text width={180}>{item?.description}</Text>
              </Box>
            ))}
        </Flex>
        <Button onClick={continuePlay} bgColor={"#86B6F6"}>
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
}

export default PopupImages;
