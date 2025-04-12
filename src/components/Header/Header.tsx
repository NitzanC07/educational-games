import { Button, Flex, Heading, Link as ChakraLink, Menu, Portal, Text } from "@chakra-ui/react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";


function Header() {
  const { container } = styles;
  return (
    <header className={container}>
      <Flex gap={10}>
        <Heading
          fontSize={"3xl"}
          color={"#B4D4FFcc"}
          _hover={{ color: "#B4D4FFff" }}
          transition={"all 0.7s ease-in-out"}
        >
          <Link to={"/"}>חושבים ונהנים</Link>
        </Heading>

        <Menu.Root>
          <Menu.Trigger asChild>
            <ChakraLink color={"#EEF5FF"} _hover={{ color: "#B4D4FF" }}>
              משחקים
            </ChakraLink>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content dir="rtl" bgColor={"#B4D4FFdd"} width={200}>
                <Menu.Item value="memory-game" fontSize={"2xl"} my={2} py={3} transition={"all 0.5s ease-in-out"}>
                  <Link to="/memory-game">משחק זכרון</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
      <Text color={"#B4D4FF"}>ניצן כהן</Text>
    </header>
  );
}

export default Header;
