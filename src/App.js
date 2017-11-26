import React, { Component } from 'react';
import './App.sass';
import Clock from './components/Clock/Clock';
import Control from './components/Control/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      workTime: 25,
      breakTime: 5
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

  render() {
    return (
      <div className="App">
        <Control startValue={this.state.workTime}  type="work" size="100" controlMax="60" passControlData={this.updateControls}/>
        <Clock work={this.state.workTime} break={this.state.breakTime} size="200"/>
        <Control startValue={this.state.breakTime}  type="break" size="100" controlMax="60" passControlData={this.updateControls}/>
      </div>
    );
  }
}

export default App;
