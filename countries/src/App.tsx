import React from 'react';
import './App.css';
import PopdownMenu from './components/PopdownMenu';
import Countries from './Countries';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PopdownMenu />
      <Router>
        <Routes>
        <Route path='/countries' Component={Countries} />
        <Route path='/page1' Component={Page1} />
        <Route path='/page2' Component={Page2} />
        </Routes>
      </Router>
      {/* <Countries /> */}
      </header>
    </div>
  );
}

export default App;
