import React, {Component} from 'react'
// import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './MobileTimer.css'

export default class MobileTimer extends Component {
  	render() {
	    return (
	      <div className="centered mobile-timerBox">
		    <div className={this.props.timer < 4 && this.props.gameState === "questionActive" ? "mobile-timer animated infinite flash red-text" : "mobile-timer"}>{this.props.timer}</div>
		    <div className={this.props.timer < 4 && this.props.gameState === "questionActive"  ? "mobile-timer-bottom red-text" : "mobile-timer-bottom"}>Seconds Remaining</div>
	      </div>
	    )
	}
}



   		 //    <div className={this.props.timer < 4 ? "mobile-timer animated infinite rotate360 red-text" : "mobile-timer"}>{this.props.timer}</div>
		    // <div className={this.props.timer < 4 ? "mobile-timer-bottom red-text" : "mobile-timer-bottom"}>Seconds Remaining</div>