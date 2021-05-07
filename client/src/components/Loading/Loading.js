import React, {Component} from 'react';
import "./Loading.css";

export default class Loading extends Component {

  state={
  }

  componentWillUnmount(){
  }

  render() {

    return (
      <div className="loading-container">
        <img src="assets/img/quizit-logo.png" className="loading-logo" />
        <h3 className="centered loading-text">Loading</h3>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    )
  }
}
