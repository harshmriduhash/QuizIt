import React from "react";
import "./Logo.css";

const Logo = 
    <div>
        <div className="">
            <div className="logo-span float-left">
                <img src="/assets/img/quizit-logo-white.png" className="quizit-logo"/>
            </div>
            <div className="logo-span2 float-left">
                <span className="logo-text">Powered by </span>
                <a href="https://opentdb.com/"><img src="/assets/img/open-trivia-logo.png" className="open-trivia-logo"/></a>
            </div>
        </div>
    </div>

export default Logo;