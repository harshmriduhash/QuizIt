import React, { Component } from "react";
import "./MobilePregame.css";
import MobileTimer from "../MobileTimer";
// import socket from '../io';

class MobilePregame extends Component {

  state = {
    // endpoint: "localhost:3001",
  };

  render() {
    return (
      <div className="pregame-container">
      	<img src="assets/img/quizit-logo.png" className="pregame-logo" />
        <h3 className="centered no-margin">Next game starting!</h3>
        <MobileTimer timer={this.props.timer}/>
      </div>
    );
  }
}

export default MobilePregame;