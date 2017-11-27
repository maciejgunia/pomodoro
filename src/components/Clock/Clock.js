import React, { Component } from 'react';
import './Clock.sass';

class Clock extends Component {
    workSeconds = this.props.work*60;
    breakSeconds = this.props.break*60

    constructor (props) {
        super(props);
        this.state = {
            seconds: this.workSeconds,
            maxSeconds: this.workSeconds,
            timerActive: false,
            currentCycleIsWork : true,
            strokeMax: props.size*Math.PI,
            strokeMin: 0,
            timerType: 'work'
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.work !== newProps.work){
            this.workSeconds = newProps.work*60;

            if(this.state.currentCycleIsWork)
                this.setState({
                    seconds: this.workSeconds,
                    maxSeconds: this.workSeconds
                });
        }

        if(this.props.break !== newProps.break){
            this.breakSeconds = newProps.break*60;

            if(!this.state.currentCycleIsWork)
                this.setState({
                    seconds: this.breakSeconds,
                    maxSeconds: this.breakSeconds
                });
        }

        if(newProps.reset){
            this.setState({
                seconds: this.workSeconds,
                maxSeconds: this.workSeconds,
                currentCycleIsWork : true,
                strokeMax: this.props.size*Math.PI,
                strokeMin: 0,
                timerType: 'work'
            });

            if(this.state.timerActive){
                this.startStopTimer();
            }

            this.props.resetclock();
        }
    }

    secondsToTime (seconds) {
        if(seconds > 3599)
            return new Date(1000 * seconds).toISOString().substr(11, 8);
        else
            return new Date(1000 * seconds).toISOString().substr(14, 5);
    }

    startStopTimer = () => {
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
                    timerType: 'break'
                });  
            } else {
                this.setState({
                    seconds: this.workSeconds,
                    maxSeconds: this.workSeconds,
                    currentCycleIsWork: true,
                    strokeMin: 0,
                    timerType: 'work'
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
                    timertype={this.state.timerType}
                    r={this.props.size/2} 
                    cx={this.props.size/2} 
                    cy={this.props.size/2}
                    stroke={this.state.strokeColor}
                    strokeWidth={this.props.size/8}
                    strokeDasharray={this.state.strokeMin + ' ' + this.state.strokeMax}/>
                </svg>
                <div className="clock-output">{this.secondsToTime(this.state.seconds)}</div>
            </div>
        );
    }
}

export default Clock;