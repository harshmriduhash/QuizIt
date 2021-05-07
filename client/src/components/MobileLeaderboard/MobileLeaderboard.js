import React, {Component} from "react";
import {Panel, ListGroup, ListGroupItem, Modal} from 'react-bootstrap'
import MobileTimer from "../MobileTimer";
import "./MobileLeaderboard.css";

class MobileLeaderboard extends Component{
  componentWillMount(){
    if(this.props.scores){
      var tempScores = this.props.scores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
      });
      this.setState({scores:tempScores});
    }
  }

  state = {
    // scores:[{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},{uid:1,username:"Jon",score:10},{uid:1,username:"Bob",score:9},{uid:1,username:"Joe",score:8},]
    scores:[]
  };

  render() {
    return (
      <div className="mobileHeight">
        <div className="centered mobile-top-banner-text">Leaderboard</div>
        <MobileTimer timer={this.props.timer} gameState={this.props.gameState} />
        <div className="mobile-leaderboard-wrapper">
	      {this.state.scores.length?this.state.scores.map((score,index)=>{return(
	        <div key={index} className="mobile-leaderboard-div">
	          <span className="mobile-leaderboard-name">{score.username}</span>
	          <span className="mobile-leaderboard-score">Score: {score.score}</span>
	        </div>)
	      }):<h3 className="centered mobile-no-scores">No Scores</h3>}
	    </div>
      </div>
    );
  }
}

export default MobileLeaderboard;