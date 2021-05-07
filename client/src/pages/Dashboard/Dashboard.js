import React, { Component } from "react";
import API from "../../utils/API.js";

class Dashboard extends Component {
	state = {
		id:"",
		username:"",
		name:"",
		email:""
	}

	componentWillMount(){
		// const user = JSON.parse(localStorage.user);
		// this.setState({id:user.id,username:user.username,name:user.name,email:user.email});
		API.getProfileInfo(localStorage.jwt)
			.then(res=>{
				console.log(res);
				const userInfo = res.data.user
				this.setState({id:userInfo._id,username:userInfo.username,name:userInfo.name,email:userInfo.email})
			})
	}



	render(){
		return(
			<div>
				<p>Id: {this.state.id}</p>
				<p>Name: {this.state.name}</p>
				<p>Username: {this.state.username}</p>
				<p>Email: {this.state.email}</p>
			</div>
		)
	}
}

export default Dashboard;