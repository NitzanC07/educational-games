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
          color={"green.600"}
          _hover={{ color: "green.400" }}
          transition={"all 0.7s ease-in-out"}
        >
          <Link to={"/"}>משחקים חינוכיים</Link>
        </Heading>

        <Menu.Root>
          <Menu.Trigger asChild>
            <ChakraLink>
              משחקים
            </ChakraLink>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content dir="rtl">
                <Menu.Item value="memory-game">
                  <Link to="/memory-game">משחק זכרון</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
      <Text>ניצן כהן</Text>
    </header>
  );
}

export default Header;
