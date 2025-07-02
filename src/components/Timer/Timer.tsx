import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Timer() {
  const [setupWorkSeconds, setSetupWorkSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsTimerRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const startStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    setSeconds(setupWorkSeconds)
  };

  const progress = ((1 - seconds / setupWorkSeconds) * 100).toFixed(0); // calculate progress
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      height={"100%"}
    >
      {/* <Heading mb={5}>ניהול זמן</Heading> */}
      {isTimerRunning && (
        <Flex
          w={350}
          h={350}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
          boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.5)"}
          backgroundGradient={`conic-gradient(transparent ${progress}%, #176B87 ${progress}%)`}
        >
          <Flex
            w={300}
            h={300}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            border={"1px solid black"}
            borderRadius={"50%"}
            bgColor={"#fff"}
            // boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.5)"}
          >
            <Text color={"#176B87"} fontSize={"5xl"}>
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(seconds % 60).toString().padStart(2, "0")}
            </Text>
          </Flex>
        </Flex>
      )}

      {!isTimerRunning && (
        <Flex mt={5} flexDirection={"column"} alignItems={"center"}>
          <Text>הגדרת זמן (בשניות)</Text>
          <Input
            type="number"
            value={setupWorkSeconds}
            onChange={(e) => setSetupWorkSeconds(Number(e.target.value))}
          />
          <Flex gap={5} mt={2}>
            <Button onClick={startStopTimer}>התחל</Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Timer;
