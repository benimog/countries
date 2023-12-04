import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopdownMenu from "./components/PopdownMenu";
import Countries from "./components/Countries";
import FlagGuess from "./components/FlagGuess";
import FlagWrite from "./components/FlagWrite";
import Home from "./components/Home";
import About from "./components/About";

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
            <Route path="/write" Component={FlagWrite}/>
            <Route path="/about" Component={About}/>
          </Routes>
        </Router>
      </div>
      <div className="bottom-container">
      </div>
    </div>
  );
}

export default App;
