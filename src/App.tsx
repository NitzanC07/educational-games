import React from "react";
import styles from "./App.module.css";
import { Provider } from "./components/ui/provider";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import { Container, LocaleProvider } from "@chakra-ui/react";
import Timer from "./components/Timer/Timer";
import cardsLego from "./data/memory-game-lego.json";
import cardsTrees from "./data/memory-game-trees.json";

function App() {
  const { App, Main } = styles;
  return (
    <Provider>
      <LocaleProvider locale="he">
        <BrowserRouter>
          <div className={App}>
            <Header />
            <main className={Main}>
              <Container
                textAlign={"right"}
                minW={"100%"}
                height={"100vh"}
                mt={2}
                pt={0}
                px={0}
                mx={0}
                overflowY={"scroll"}
              >
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/memory-game-trees" element={<MemoryGame subject="עצים" cards={cardsTrees} />} />
                  <Route path="/memory-game-lego" element={<MemoryGame subject="לגו" cards={cardsLego} />} />
                  <Route path="/timer" element={<Timer />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LocaleProvider>
    </Provider>
  );
}

export default App;
