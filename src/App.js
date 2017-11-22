import React, { Component } from 'react';
import './App.sass';
import Clock from './components/Clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock work="0.1" break="0.1" size="200"/>
      </div>
    );
  }
}

export default App;
