import React, { Component } from "react";
import "./ChatButton.css";

class ChatButton extends React.Component {
    constructor(props) {
        super(props);
        state: {

        }
    }

    render() {
        return (
            <button type="button" className="btn btn-primary chatButton" onClick={this.props.sendChatMsg}>Submit</button>
        )
    }
}

export default ChatButton;