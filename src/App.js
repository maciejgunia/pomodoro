import React, { Component } from 'react';
import './reset.sass';
import './App.sass';
import Clock from './components/Clock/Clock';
import Control from './components/Control/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      workTime: 25,
      breakTime: 5,
      shouldReset: false
    }
  }

  updateControls = (timerType, minutes) => {
    if(timerType === 'work')
    this.setState({
      workTime: minutes
    });
    else
    this.setState({
      breakTime: minutes
    });
  }

  resetClock = () => {
    this.setState({
      shouldReset: !this.state.shouldReset
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <h1>Freecodecamp Pomodoro Clock<br/> by Maciej Gunia</h1>
        <div className="App">
          <div className="controls">
            <Control startValue={this.state.workTime}  type="work" size="100" controlMax="60" passControlData={this.updateControls}/>
            <Control startValue={this.state.breakTime}  type="break" size="100" controlMax="60" passControlData={this.updateControls}/>
            <button className="reset-button" onClick={this.resetClock}>reset</button>
          </div>        
          <Clock work={this.state.workTime} break={this.state.breakTime} reset={this.state.shouldReset} resetclock={this.resetClock} size="320"/>
        </div>
      </div>
    );
  }
}

export default App;
