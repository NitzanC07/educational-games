import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PopupSummary from "./PopupTimer/PopupSummary";

function Timer() {
  const [setupTimerSeconds, setSetupTimerSeconds] = useState(30);
  const [setupTimerMinutes, setSetupTimerMinutes] = useState(2);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isStoperRunning, setIsStoperRunning] = useState(false);
  const [stoper, setStoper] = useState(0);
  const [targetSeconds, setTargetSeconds] = useState(0);
  const [overallSeconds, setOverallSeconds] = useState(0);
  const [isShowSummary, setIsShowSummary] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsTimerRunning(false);
            setIsStoperRunning(true);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (isStoperRunning) {
      const interval = setInterval(() => {
        setStoper((stoper) => {
          return stoper + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStoperRunning]);

  const startTimer = () => {
    setStoper(0);
    setTimerSeconds(setupTimerSeconds + setupTimerMinutes * 60);
    setIsTimerRunning(true);
  };

  const stopStoper = () => {
    setTargetSeconds(setupTimerMinutes * 60 + setupTimerSeconds);
    setOverallSeconds(
      setupTimerMinutes * 60 + setupTimerSeconds - timerSeconds + stoper
    );
    setIsShowSummary(true);
    setIsStoperRunning(false);
    setIsTimerRunning(false);
  };

  const progress = (
    (1 - timerSeconds / (setupTimerSeconds + setupTimerMinutes * 60)) *
    100
  ).toFixed(0); // calculate progress
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      height={"100%"}
    >
      
      {(isTimerRunning || isStoperRunning) && (
        <Flex flexDir={"column"} alignItems={"center"}>
          <Flex
            w={["310px","450px"]}
            h={["310px", "450px"]}
            mb={5}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"50%"}
            boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.5)"}
            backgroundGradient={`conic-gradient(transparent ${progress}%, #176B87 ${progress}%)`}
          >
            <Flex
              w={["260px", "400px"]}
              h={["260px", "400px"]}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              border={"1px solid black"}
              borderRadius={"50%"}
              bgColor={"#fff"}
            >
              <Text color={"#176B87"} fontSize={"5xl"}>
                {Math.floor(timerSeconds / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timerSeconds % 60).toString().padStart(2, "0")}
              </Text>
              <Text>
                {Math.floor(stoper / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(stoper % 60).toString().padStart(2, "0")}
              </Text>
            </Flex>
          </Flex>
          <Button
            width={90}
            height={90}
            bgColor={"red.700"}
            onClick={() => stopStoper()}
          >
            עצור
          </Button>
        </Flex>
      )}

      {!isTimerRunning && !isStoperRunning && (
        <Flex mt={5} flexDirection={"column"} alignItems={"center"}>
          <Heading mb={5} color={"#176B87"}>הגדרת יעד זמן (mm:ss)</Heading>
          <Flex
            bgColor={"#fff"}
            borderRadius={25}
            border={"4px solid #176B87"}
            p={2}
          >
            <Input
              type="number"
              value={
                setupTimerSeconds < 0 || setupTimerSeconds > 59
                  ? 0
                  : setupTimerSeconds
              }
              onChange={(e) => setSetupTimerSeconds(Number(e.target.value))}
              width={100}
              height={100}
              fontSize={"5xl"}
              border={0}
              borderRadius={0}
              bgColor={"#fff"}
              color={"#176B87"}
            />
            <Text
              fontSize={"6xl"}
              height={100}
              bgColor={"#fff"}
              color={"#176B87"}
            >
              :
            </Text>
            <Input
              type="number"
              value={setupTimerMinutes < 0 ? 0 : setupTimerMinutes}
              onChange={(e) => setSetupTimerMinutes(Number(e.target.value))}
              width={100}
              height={100}
              fontSize={"5xl"}
              textAlign={"center"}
              border={0}
              borderRadius={0}
              bgColor={"#fff"}
              color={"#176B87"}
            />
          </Flex>
          <Flex gap={5} mt={2}>
            <Button onClick={startTimer} bgColor={"#176B87"} w={90} h={90}>
              התחל
            </Button>
          </Flex>
        </Flex>
      )}
      {isShowSummary && (
        <PopupSummary
          targetSeconds={targetSeconds}
          overallSeconds={overallSeconds}
          setIsShowSummary={setIsShowSummary}
        />
      )}
    </Flex>
  );
}

export default Timer;
