import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopdownMenu from "./components/PopdownMenu";
import Countries from "./components/Countries";
import FlagGuess from "./components/FlagGuess";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <div className="top-container">
        <PopdownMenu />
      </div>
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/countries" Component={Countries} />
            <Route path="/flags" Component={FlagGuess} />
          </Routes>
        </Router>
      </div>
      <div className="bottom-container">
      </div>
    </div>
  );
}

export default App;
