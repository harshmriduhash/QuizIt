import React, { Component } from "react";
// import socket from '../io';
import "./leaderboard.css";


class GameEnd extends Component {

  componentWillMount(){
    if(this.props.scores){
      var tempScores = this.props.scores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
      });
      this.setState({scores:tempScores});
    }
  }

  state = {
    scores:[]
  };

  render() {
    return (
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">
        {/* <img id="dancing-alien" alt="meaningful text ;-)" src={require("./alien.gif")}/>
        <img id="dancing-eddy" alt="meaningful text ;-)" src={require("./tenor.gif")}/> */}
        Leaderboard
        {/* <img id="dancing-eddy" alt="meaningful text ;-)" src={require("./tenor.gif")}/>
        <img id="dancing-alien" alt="meaningful text ;-)" src={require("./alien.gif")}/> */}
        </h1>
      	<div className="leaderboard-score">{this.state.scores?this.state.scores.map(score=>{return(
          <div key={score.uid} className="leaderboardItem">
            <div className="row">
              <div className="col-5">
                <span className="leaderboard-name">{score.username}</span>
              </div>
              <div className="col-4"></div>
              <div className="col-3">
                <span className="leaderboard-score">Score: {score.score}</span>
              </div>
            </div>
          </div>)
        }):<div>loading</div>}</div>
      </div>
    );
  }
}

export default GameEnd;