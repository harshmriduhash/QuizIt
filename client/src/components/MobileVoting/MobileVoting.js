import React, { Component } from "react";
import MobileTimer from "../MobileTimer";
import socket from '../io';
import "./MobileVoting.css";

function removeEntertainment(string){
  return string.replace('Entertainment: ', '');
}

class MobileVoting extends Component {

  state = {
    activeIndex:-1
  };

  handleVote = (categoryNum,userId,index)=>{
    const socketObj = {
      userId,
      categoryNum,
      room:'master'
    }
    console.log(socketObj);
    socket.emit('vote',socketObj);
    this.setState({activeIndex:index})
  }

  componentDidMount(){
    console.log(this.props.votingCategories);
  }

  render() {
    return (
      <div>
        <h3 className="centered mobile-voting-h3-margin">Vote for a category!</h3>
        {this.props.votingCategories.map((votingInfo,index)=>{return(
          <div key={index}>
            <button
              onClick={()=>{this.handleVote(votingInfo.categoryNum,this.props.userId,index)}}
              className={index === this.state.activeIndex ? "mobile-btn-vote mobile-btn-vote-active":"mobile-btn-vote"}
            >
              {removeEntertainment(votingInfo.category)}
            </button>
          </div>
        )
        })}
        <MobileTimer timer={this.props.timer} />
      </div>
    );
  }
}

export default MobileVoting;