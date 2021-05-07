import React, {Component} from 'react'
// import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Timer.css'

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
      timerLow: undefined
    }
  }

  	createTimerMessage = () => {

  		if (this.props.gameState === 'pregame'){
  			let message = <div className="timer">Next game in {this.props.timer} seconds</div>;
  			return message
  		} else if (this.props.gameState === 'questionActive' && this.props.timer <= 3){
  			let message = <div className="timer"><span className="timerNumber fadeIn">{this.props.timer} seconds left</span></div>;  		
  			return message
  		} else if (this.props.gameState === 'questionActive'){
  			let message = <div className="timer">{this.props.timer} seconds left</div>;  		
  			return message 
  		} else if (this.props.gameState === 'voting' && this.props.timer <= 3){
  			let message = <div className="timer"><span className="timerNumber fadeIn">{this.props.timer} seconds to vote</span></div>;
  			return message
  		} else if (this.props.gameState === 'voting'){
  			let message = <div className="timer">{this.props.timer} seconds to vote</div>;
  			return message
  		} else if (this.props.gameState === 'gameEnd'){
  			let message = undefined;
  			return message
  		} else if (this.props.gameState === 'intermission'){
  			let message = <div className="timer">Next question in {this.props.timer} seconds</div>;
  			return message
  		} 
  		else {
  			let message = undefined;
  			return message
  		}

  	};

  render() {

    return (
    	
    	<div className="centered timerBox">
    	{this.createTimerMessage()}
    	</div>
    )
  }
}
