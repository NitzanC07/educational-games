import React from "react";
import "./App.css";
import { Provider } from "./components/ui/provider";
import { Button, Heading, Text } from "@chakra-ui/react";

function App() {
  return (
    <Provider>
      <div className="App">
        <Heading>Educational Games</Heading>
        <Text>משחקים חינוכיים</Text>
        <Button variant={"surface"} colorPalette={"yellow"}>
          Button
        </Button>
      </div>
    </Provider>
  );
}

export default App;
