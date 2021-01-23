import React from 'react';
import './App.css';
import Component from "./component"
import TimeOut from "./timeout"
import FetchComponent from "./useFetch"

function App() {
  return (
    <div className="App">
      <Component ms={2000}/>
      <TimeOut />
      <FetchComponent />
    </div>
  );
}

export default App;
