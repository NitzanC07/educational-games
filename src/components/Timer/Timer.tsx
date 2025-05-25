import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(65);
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
            })            
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [isTimerRunning]);

  const startStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);    
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Heading>ניהול זמן</Heading>
      <Text>{Math.floor(seconds/60).toString().padStart(2, '0')}:{(seconds%60).toString().padStart(2, '0')}</Text>
      <Flex gap={5}>
        <Button onClick={startStopTimer}>{isTimerRunning ? "עצור" : "התחל"}</Button>
        <Button onClick={() => setSeconds(100)}>איפוס</Button>
      </Flex>
    </Flex>
  );
}

export default Timer;
