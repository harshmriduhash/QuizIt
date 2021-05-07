import React, { Component } from "react";
import "./ChatMessageArea.css";
import socket from '../io';

class ChatMessageArea extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="chatMessageArea">
                <ul className="chatList">
                    {this.props.messages.map((message,index)=><li key={index} className="listItem">{message.user.username + ": " + message.msg}</li>)}
                    <li>
                        <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ChatMessageArea;