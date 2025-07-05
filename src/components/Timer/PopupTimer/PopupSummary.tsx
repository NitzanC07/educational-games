import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import closeIcon from "../../../assets/close-icon.svg";

interface PopupSummaryProps {
  targetSeconds: number;
  overallSeconds: number;
  setIsShowSummary: Dispatch<SetStateAction<boolean>>;
}
function PopupSummary({
  targetSeconds,
  overallSeconds,
  setIsShowSummary,
}: PopupSummaryProps) {
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
        pos={"relative"}
        flexDirection={"column"}
        width={450}
        bgColor={"#fff"}
        border={"4px solid #86B6F6"}
        borderRadius={10}
        justifyContent={"center"}
        p={5}
      >
        <Heading mb={5} color={"#176B87"}>
          סיכום תרגיל
        </Heading>
        <Text>
          זמן יעד:{" "}
          {Math.floor(targetSeconds / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(targetSeconds % 60)
            .toString()
            .padStart(2, "0")}{" "}
          דקות
        </Text>
        <Text>
          זמן כולל:{" "}
          {Math.floor(overallSeconds / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(overallSeconds % 60)
            .toString()
            .padStart(2, "0")}{" "}
          דקות
        </Text>
        <Text
          color={targetSeconds - overallSeconds > 0 ? "green" : "red"}
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
          mt={5}
        >
          {targetSeconds - overallSeconds > 0
            ? `התוצאה שלך היא ${
                targetSeconds - overallSeconds
              } שניות פחות מהיעד.`
            : `התוצאה שלך היא ${
                overallSeconds - targetSeconds
              } שניות יותר מהיעד.`}
        </Text>
        <Button
          pos={"absolute"}
          top={1}
          left={0}
          m={0}
          p={0}
          color={"#176B87"}
          bgColor={"transparent"}
          onClick={() => setIsShowSummary(false)}
        >
          <Image src={closeIcon} alt="close-icon" />
        </Button>
      </Flex>
    </Flex>
  );
}

export default PopupSummary;
