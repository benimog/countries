import React from 'react';
import './App.css';
import PopdownMenu from './PopdownMenu';
import Countries from './Countries';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PopdownMenu />
      <Countries />
      </header>
    </div>
  );
}

export default App;
