import React, { Component } from 'react';
import './App.sass';
import Clock from './components/Clock/Clock';
import Control from './components/Control/Control';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock work="0.1" break="0.1" size="200"/>
        <Control size="100" controlMax="60"/>
      </div>
    );
  }
}

export default App;
