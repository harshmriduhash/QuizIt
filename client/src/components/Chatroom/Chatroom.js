import React, { Component } from "react";
import socket from '../io';
import "./Chatroom.css";

import ChatMessageArea from "../ChatMessageArea";
import ChatInput from "../ChatInput";

class Chatroom extends Component {
  state = {
    user: this.props.user,
    messages:[]
  };

  componentWillMount() {
    socket.on('chatReceive', (chatMsgObj) => {
      console.log('chatReceived');
      console.log(chatMsgObj);
      this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
        console.log(this.state.messages);
      })
    });
  }

  sendChatMsg = (chatMsgObj) => {
    socket.emit('chatSend', (chatMsgObj));
    this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
      console.log(this.state.messages);
    })
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="chatTitle">
          Chat Room
        </div>
        <div className="chatMessageAreaHeight">
          <ChatMessageArea messages={this.state.messages}> </ChatMessageArea>
        </div>
        <div className="chatInputHeight">
          <ChatInput user={this.props.user} sendChatMsg={this.sendChatMsg}> </ChatInput>
        </div>
      </div>
    );
  }
}

export default Chatroom;