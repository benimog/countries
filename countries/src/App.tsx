import React from "react";
import "./App.css";
import PopdownMenu from "./components/PopdownMenu";
import Countries from "./Countries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlagGuess from "./components/FlagGuess";
import Page2 from "./components/Page2";

function App() {
  return (
    <div className="App">
      <div className="top-container">
        <PopdownMenu />
      </div>
      <header className="App-header" style={{ paddingTop: "80px" }}>
        <Router>
          <Routes>
            <Route path="/countries" Component={Countries} />
            <Route path="/GuessTheFlag" Component={FlagGuess} />
            <Route path="/page2" Component={Page2} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
