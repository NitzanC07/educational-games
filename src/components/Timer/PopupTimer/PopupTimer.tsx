import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function PopupTimer() {
    
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
          הגדרת טיימר
        </Heading>
        
      </Flex>
    </Flex>
  );
}

export default PopupTimer;
