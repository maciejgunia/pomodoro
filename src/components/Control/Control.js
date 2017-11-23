import React, { Component } from 'react';
import './Control.sass';

class Control extends Component {
    movement = 0;

    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            isDragging: false,
            previousMousePosition: [0,0],
            strokeMax: props.size*Math.PI,
            strokeMin: props.size*Math.PI/this.props.controlMax
        }

        this.startDragging = this.startDragging.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
    }

    componentDidMount() {
        document.getElementById('control-field').addEventListener('mousedown', this.startDragging);
        document.addEventListener('mouseup', this.stopDragging);
        document.addEventListener('mousemove', this.handleMousemove);
    }

    startDragging(event) {
        console.log(event.clientX);

        this.setState({
            isDragging: true,
            previousMousePosition: [event.clientX, event.clientY]
        });
    }

    stopDragging(event) {
        if(this.state.isDragging) {
            console.log(event.clientX);

            this.setState({
                isDragging: false
            });
        }
    }

    handleMousemove(event) {
        if(this.state.isDragging) {
            if(Math.abs(event.clientX - this.state.previousMousePosition[0]) > Math.abs(this.state.previousMousePosition[1] - event.clientY)) {
                this.movement = event.clientX - this.state.previousMousePosition[0];
            } else {
                this.movement = this.state.previousMousePosition[1] - event.clientY;
            }

            if(this.movement > 0) {
                this.setState({
                    number: Math.floor((this.state.strokeMin / this.state.strokeMax)*this.props.controlMax),
                    strokeMin: Math.min(this.state.strokeMin + this.movement, this.state.strokeMax),
                    previousMousePosition: [event.clientX, event.clientY]
                });
            } else {
                this.setState({
                    number: Math.floor((this.state.strokeMin / this.state.strokeMax)*this.props.controlMax),
                    strokeMin: Math.max(this.state.strokeMin + this.movement, this.state.strokeMax/this.props.controlMax),
                    previousMousePosition: [event.clientX, event.clientY]
                });
            }
        }
    }

    render() {
        return (
            <div className="control-container">
                <svg 
                id="control-field"
                className="control-field"
                width={this.props.size}
                height={this.props.size}>
                    <circle 
                    className="control-display" 
                    r={this.props.size/2} 
                    cx={this.props.size/2} 
                    cy={this.props.size/2}
                    stroke="white"
                    strokeWidth={this.props.size/8}
                    strokeDasharray={this.state.strokeMin + ' ' + this.state.strokeMax}/>
                    // strokeDasharray={'20' + ' ' + this.state.strokeMax}/>
                </svg>
                <div className="control-output">{this.state.number}</div>
            </div>
        );
    }
}

export default Control;