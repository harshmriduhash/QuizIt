import React from "react";

const ProfileButton = props => {
    if (props.loggedIn) {
        return (
            <li className='nav-item'>
                <a className='nav-link' onClick={props.showProfile} href='#'>{props.username} Profile</a>
            </li>
        )
    } else {
        return (
            <li className="nav-item active text-right">
            </li>
        )
    }
}

export default ProfileButton;