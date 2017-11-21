import React, { Component } from 'react';
import './App.sass';
import Clock from './components/Clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock timer="25"/>
      </div>
    );
  }
}

export default App;
