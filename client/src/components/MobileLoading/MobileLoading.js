import React, {Component} from 'react';
import "./MobileLoading.css";

export default class MobileLoading extends Component {

  state={
  }

  componentWillUnmount(){
  }

  render() {

    return (
      <div className="mobile-loading-container">
        <img src="assets/img/quizit-logo.png" className="mobile-loading-logo" />
        <h3 className="centered mobile-loading-text">Loading</h3>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    )
  }
}
