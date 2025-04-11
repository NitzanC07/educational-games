import { Button, Flex, Heading, Text } from "@chakra-ui/react";

interface PopupSuccessProps {
  restartGame: () => void;
  content: string;
  score: number;
  tries: number;
  seconds: number;
}

function PopupSuccess({
  restartGame,
  content,
  score,
  tries,
  seconds,
}: PopupSuccessProps) {
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
          סיכום המשחק
        </Heading>
        <Text mb={5} color={"#176B87"}>
          עשית {tries} ניסיונות, בתוך{" "}
          {`${Math.floor(seconds / 60)}`.padStart(2, "0")}:
          {`${seconds % 60}`.padStart(2, "0")} דקות.
        </Text>
        <Text mb={5} color={"#176B87"}>
          פספסת {tries - score} פעמים צמדים לא תואמים.
        </Text>
        <Text mb={5} color={"#176B87"}>
          הצלחת למצוא {score} התאמות.
        </Text>
        <Text mb={5} color={"#176B87"}>
          הניקוד הכולל שלך הוא {Math.round((score / tries) * 100)}.
        </Text>
        <Text mb={5} fontSize={"2xl"} textAlign={"center"} color={"#176B87"}>
          כל הכבוד!
        </Text>

        <Button onClick={restartGame} bgColor={"#86B6F6"}>
          שחק שוב
        </Button>
      </Flex>
    </Flex>
  );
}

export default PopupSuccess;
