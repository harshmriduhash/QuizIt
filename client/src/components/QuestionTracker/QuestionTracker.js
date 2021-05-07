import React from "react";
import "./QuestionTracker.css"

function renderDifficulty(string){
    if(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else{
        return;
    }
}

const QuestionTracker = props => (
    <div className="row no-margins questionTracker">
        <div className="col-10 questionTrackerBox align-left">{props.category}</div>
        <div className="col-2 questionTrackerBox align-right">{renderDifficulty(props.difficulty)}</div>
    </div>
)

export default QuestionTracker;