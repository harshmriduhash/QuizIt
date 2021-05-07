import React, {Component} from 'react';
import "./PlayerCount.css";

class PlayerCount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span className="PlayerCount">{this.props.activeUsers.length} players are playing!</span>
            </div>
        )
    }
}

export default PlayerCount;