import React, { Component } from 'react';
import './Clock.sass';

class Clock extends Component {
    workSeconds = this.props.work*60;
    breakSeconds = this.props.break*60;

    constructor (props) {
        super(props);
        this.state = {
            seconds: this.workSeconds,
            maxSeconds: this.workSeconds,
            timerActive: false,
            currentCycleIsWork : true,
            strokeMax: props.size*Math.PI,
            strokeMin: 0,
            strokeColor: 'green'
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
            seconds: this.state.seconds - 1,
            strokeMin: ((this.state.maxSeconds - this.state.seconds + 1)/this.state.maxSeconds) * this.state.strokeMax
        });

        if (this.state.seconds < 0)
            if(this.state.currentCycleIsWork) {
                this.setState({
                    seconds: this.breakSeconds,
                    maxSeconds: this.breakSeconds,
                    currentCycleIsWork: false,
                    strokeMin: 0,
                    strokeColor: 'red'
                });  
            } else {
                this.setState({
                    seconds: this.workSeconds,
                    maxSeconds: this.workSeconds,
                    currentCycleIsWork: true,
                    strokeMin: 0,
                    strokeColor: 'green'
                });    
            }
    }
    
    render() {
        return (
            <div className="clock-container">
            <svg 
            className="clock" 
            onClick={this.startStopTimer}
            width={this.props.size}
            height={this.props.size}>
                <circle 
                className="clock-face" 
                r={this.props.size/2} 
                cx={this.props.size/2} 
                cy={this.props.size/2}
                stroke={this.state.strokeColor}
                strokeWidth={this.props.size/8}
                strokeDasharray={this.state.strokeMin + ' ' + this.state.strokeMax}/>
            </svg>
            {this.sencondsToTime(this.state.seconds)}
            </div>
        );
    }
}

console.log('yoyo');

export default Clock;