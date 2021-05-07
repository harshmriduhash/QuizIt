import React, {Component} from "react";

class Profile extends Component {

	state = {

	}

	componentDidMount(){
	}

	render(){
		return(
			<div>
				<div>
					{this.props.user.username}
				</div>
				<div>
					Lifetime Stats:
				</div>
				<div>
					Questions Answered: {this.props.user.stats ? this.props.user.stats.answered : null}
				</div>
				<div>
					Correctly Answered: {this.props.user.stats ? this.props.user.stats.correct : null}
				</div>
				<div>
					Correct Rate: {this.props.user.stats ? Math.floor(this.props.user.stats.correct/this.props.user.stats.answered*100) : null}%
				</div>
			</div>
		);
	}
}

export default Profile;
