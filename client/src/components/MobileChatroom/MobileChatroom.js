import React, { Component } from "react";
import socket from '../io';
import "./MobileChatroom.css";

// import MobileChatMessageArea from "../MobileChatMessageArea";
// import ChatInput from "../ChatInput";

class Chatroom extends Component {
  state = {
    user: this.props.user,
    messages:[],
    msg: ''
  };

  createChatObj = () => {
      if(this.state.msg.trim()){
          const chatMsgObj = {
              user: this.props.user,
              msg: this.state.msg
          }
          this.sendChatMsg(chatMsgObj);
          this.setState({
              msg: ''
          });
      }
  }

  componentWillMount() {
    socket.on('chatReceive', (chatMsgObj) => {
      console.log('chatReceived');
      console.log(chatMsgObj);
      this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
        console.log(this.state.messages);
      })
    });
  }

  componentDidUpdate(){
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  sendChatMsg = (chatMsgObj) => {
    socket.emit('chatSend', (chatMsgObj));
    this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
      console.log(this.state.messages);
    })
  }

  handleTextAreaChange = (event) => {
      // console.log(event.target.value);
      if(this.state.msg){
        if(this.state.msg.length < 150){
          this.setState({
            msg: event.target.value
          });  
        }
      }
      else{
        this.setState({
          msg: event.target.value
        });
      }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.createChatObj();
    }
  }

  scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div>
        <div className="mobile-top-banner-text centered">Chat Room</div>
        <div className="mobile-chat-container">
          <div className="mobile-chat-messages-div">
            <ul className="no-margin no-padding">
              {this.state.messages.map((message,index)=>
                <li key={index} className="listItem">
                  <strong>{message.user.username}</strong>: {message.msg}
                </li>
              )}
              <div className="mobile-ref-div" ref={(el) => { this.messagesEnd = el; }}></div>
            </ul>
          </div>
          <div className="mobile-chat-input-div">
              <textarea type="text" className="form-control mobile-chat-textarea" value={this.state.msg} onChange={this.handleTextAreaChange} onKeyPress={this._handleKeyPress}></textarea>
              <button className="mobile-chat-button" onClick={this.createChatObj}>Send Message</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Chatroom;