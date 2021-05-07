import React, { Component } from "react";
import "./Pregame.css";
// import socket from '../io';

class Pregame extends Component {

  state = {
    // endpoint: "localhost:3001",
  };

  render() {
    return (
      <div className="pregame-container">
      	<img src="assets/img/quizit-logo.png" className="pregame-logo" />
      	<div className="empty-pregame-div" />
      </div>
    );
  }
}

export default Pregame;