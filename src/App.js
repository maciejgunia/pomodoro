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
      shouldReset: false,
      tutorialVisible: "true"
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

  hideTutorial = () => {
    this.setState({
      tutorialVisible: "false"
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="App">
          <div className="controls">
            <Control startValue={this.state.workTime}  type="work" size="100" controlMax="60" passControlData={this.updateControls}/>
            <Control startValue={this.state.breakTime}  type="break" size="100" controlMax="60" passControlData={this.updateControls}/>
            <button className="reset-button" onClick={this.resetClock}>reset</button>
          </div>        
          <Clock work={this.state.workTime} break={this.state.breakTime} reset={this.state.shouldReset} resetclock={this.resetClock} size="320"/>
        </div>
        <div className="tutorial-wrapper" onClick={this.hideTutorial} tutorialvisible={this.state.tutorialVisible}>
          <div className="tutorial">
            <h1>Pomodoro Clock</h1>
            <h2>Freecodecamp challenge by Maciej Gunia</h2>
            <p>This is a pomodoro clock. In case you need guidelines how to use it, here you go:</p>
              <p>Green circle is for setting the work time. Drag it to set your desirable work session time.</p>
              <p>Red circle is for break time. Works exactly like the green one. Have fun with it.</p>
              <p>Clicking or touching the main clock will start and stop the countdown.</p>
              <p>You can change work and break time anytime you want but it will reset the current session.</p>
              <p>And you can also use the reset button, which will stop the timers, and go back to work session.</p>
              <p>sound recorded by Daniel Simion under the proper <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/3.0/">license</a>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
