import React, { Component } from "react";
import socket from '../io';

class Voting extends Component {

  state = {

  };

  handleVote = (categoryNum,userId)=>{
    const socketObj = {
      userId,
      categoryNum,
      room:'master'
    }
    console.log(socketObj);
    socket.emit('vote',socketObj);
  }

  componentDidMount(){
    console.log(this.props.votingCategories);
  }

  render() {
    return (
      <div>
        <h2>Vote for the next category</h2>
        {this.props.votingCategories.map((votingInfo,index)=>{return(
          <div key={index} style={{marginBottom:'8px'}}>
            <button
              onClick={()=>{this.handleVote(votingInfo.categoryNum,this.props.userId)}}
              className="btn btn-primary btn-vote"
              style={{width:'100%'}}
            >
              {votingInfo.category}
            </button>
          </div>
        )
        })}
      </div>
    );
  }
}

export default Voting;
