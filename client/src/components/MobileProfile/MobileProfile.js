import React, {Component} from "react";
import "./MobileProfile.css";

class MobileProfile extends Component {

	state = {

	}

	componentDidMount(){
		console.log(this.props.user.stats);
	}

	renderStats(){
		if(this.props.user.stats){
			if(this.props.user.stats.answered !== 0){
				return(
					<div>
						<div>Questions Answered: {this.props.user.stats.answered}</div>
						<div>Correctly Answered: {this.props.user.stats.correct}</div>
						<div>Correct Rate: {Math.floor(this.props.user.stats.correct/this.props.user.stats.answered*100)}%</div>
					</div>
				)
			}
			else{
				return(
					<div>Play a game for some stats!</div>
				)
			}
		}
	}

	render(){
		return(
			<div>
				<div className="centered mobile-top-banner-text">Welcome to QuizIt!</div>
				<div className="mobile-profile-container">
					<h3>Hello {this.props.user.username}!</h3>
					<div>Quizit is a trivia game that is always running! You can hop in and play anytime with anyone else connected.</div>
					<strong>To get started, swipe left!</strong>
					<h4 className="mobile-profile-smol-top-margin">Your Stats</h4>
					{this.renderStats()}
					<h3 className="align-right animated infinite pulse mobile-profile-smol-top-margin">Play QuizIt! <i className="align-right fas fa-angle-double-right"></i></h3>
				</div>
			</div>
		);
	}
}

export default MobileProfile;