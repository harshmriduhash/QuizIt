import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
// import io from 'socket.io-client';
import socket from '../io';

class Login extends Component {

  state = {
    username: "",
    password: "",
    errors:[],
    endpoint: "localhost:3001",
    redirect:false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    //Stops page from reloading
    event.preventDefault();
    //Make user credentials object with just the values we need
    const userCreds = {
      username:this.state.username,
      password:this.state.password
    }
    API.authenticateUser(userCreds).then(res=>{
      console.log(res);
      if(res.data.token){
        //Sets credentials in local storage
        localStorage.setItem('jwt',res.data.token);
        // localStorage.setItem('user',JSON.stringify(res.data.user));
        res.data.user.id=res.data.user._id;
        // console.log(res.data.user);
        var socketParams = {
          user:res.data.user,
          room:'master'
        }
        socket.emit('loggedIn',socketParams);
        //Sets Home state of loggedIn to true
        this.props.loggedInTrue(res.data.user);
      }
      else if(res.data.errors){
        this.setState({errors:res.data.errors})
      }
    })
  };

  registerButton = (event) => {
    this.setState({redirect:true});
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/register"/>;
    }
    else{
      return (
        <div className="text-center">
          {this.props.loggedIn}
          <div className="container">
          {this.state.errors.length > 0 ? this.state.errors.map((item,i)=>{return(<p key={i}>{item}</p>)}):""}
          <p className="max-center">Login</p>
          <form>
            <div>
              <input 
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
                placeholder="username"
              />
            </div>
            <div>
              <input 
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                placeholder="password"
                type="password"
              />
            </div>
            <button className="button-login" onClick={this.handleFormSubmit}>Login</button>
          </form>
          </div>
          <button className="register-button" onClick={this.registerButton}>Register</button>
        </div>
      );
    }
  }
}

export default Login;
