import React, { Component } from "react";
import "./CurrentQuestions.css";

class CurrentQuestions extends Component {

  componentWillMount(){
  }

  state = {
    questions:this.props.questions
  };

  render() {
    return (
      <div>
        Current Questions
      </div>
    );
  }
}

export default CurrentQuestions;