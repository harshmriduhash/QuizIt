import React, { Component } from "react";
import ReactDOM from "react-dom";
import socket from '../io';
import "./ChatInput.css";

import ChatButton from "../ChatButton";

class ChatInput extends React.Component {
    state = {
        user: this.props.user,
        msg: ''
    };

    createChatObj = () => {
        if(this.state.msg.trim()){
            const chatMsgObj = {
                user: this.props.user,
                msg: this.state.msg
            }
            this.props.sendChatMsg(chatMsgObj);
            console.log('createChatObj');
            console.log(chatMsgObj);
            this.setState({
                msg: ''
            });
        }
    }

    handleTextAreaChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            msg: event.target.value
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.createChatObj();
        }
    }

    render() {
        return (
            <div className="chatInput">
                <input type="text" className="form-control inputBoxStyle" id="chat-text" rows="1" value={this.state.msg} onChange={this.handleTextAreaChange} onKeyPress={this._handleKeyPress}></input>
                <ChatButton sendChatMsg={this.createChatObj}> </ChatButton>
            </div>
        )
    }

}

export default ChatInput;