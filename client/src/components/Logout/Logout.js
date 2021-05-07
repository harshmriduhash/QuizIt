import React from "react";
import "./Logout.css";

const Logout = props => {
    if (props.loggedIn) {
        return (
            <li className="nav-item active float-right">
                <a className="nav-link float-right logout" href="/logout">Logout </a>
            </li>
        )
    } else {
        return (
            <li className="nav-item active text-right">
            </li>
        )
    }
}

export default Logout;