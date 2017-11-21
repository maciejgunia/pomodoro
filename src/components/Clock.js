import React, { Component } from 'react';
import './Clock.sass';

class Clock extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            seconds: props.timer*60,
            timerActive : false
        }

        this.startStopTimer = this.startStopTimer.bind(this);
    }

    sencondsToTime (seconds) {
        return new Date(1000 * seconds).toISOString().substr(11, 8);
    }

    startStopTimer (e) {
        e.preventDefault();
        if (this.state.timerActive) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(this.countDown.bind(this), 1000);
        }

        this.setState({
            timerActive: !this.state.timerActive
        });
    }

    countDown () {
        this.setState({
            seconds: this.state.seconds - 1
        });
    }
    
    render() {
        return (
            <div className="clock" onClick={this.startStopTimer}>
                {this.sencondsToTime(this.state.seconds)}
            </div>
        );
    }
}

console.log('yoyo');

export default Clock;