import React, { Component } from "react";
import API from "../../utils/API";
import {Redirect} from "react-router-dom";
import io from 'socket.io-client';

class Login extends Component {
  state = {
    loggedIn:false,
    username: "",
    password: "",
    errors:[],
    endpoint: "localhost:3001",
    gameState: "pregame"
  };

  componentWillMount() {
<<<<<<< HEAD

=======
    this.socket.on('message', (msg) => {
      console.log(msg);
    });
    this.socket.on('roomState', (msg) => {
      console.log(msg);
      //setState based on incoming message
      if(this.state.gameState != msg.state){
        this.setState({gameState:msg.state}, ()=>{
          console.log("this.state.gameState changed to "+msg.state);
        })
      }
      // if(msg.state === "questionStart" && this.state.gameState != msg.state){
      //   this.setState({gameState:msg.state}, ()=>{
      //     console.log("this.state.gameState changed to "+msg.state);
      //   })
      // }
      // if(msg.state === "questionEnd" && this.state.gameState != msg.state){
      //   this.setState({gameState:msg.state}, ()=>{
      //     console.log("this.state.gameState changed to "+msg.state);
      //   })
      // }
      // if(msg.state === "roundEnd" && this.state.gameState != msg.state){
      //   this.setState({gameState:msg.state}, ()=>{
      //     console.log("this.state.gameState changed to "+msg.state);
      //   })
      // }
    });
>>>>>>> 4c0c4d9c7fa3857132bcb1da63bd59acfbdb8d82
  }

  // send = (event, data) => {
  //   const socket = io.connect(this.state.endpoint);
  //   socket.emit(event, data);
  // }

  socket = io();

  handleInputChange = event => {
    // console.log('derp');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    API.authenticateUser(this.state).then(res=>{
      if(res.data.token){
        console.log(res);
        localStorage.setItem('jwt',res.data.token);
        localStorage.setItem('user',JSON.stringify(res.data.user));
        var socketParams = {
          user:res.data.user,
          room:'master'
        }
        this.socket.emit('loggedIn',socketParams);
        // this.socket.emit('room',socketParams);
        // this.setState({redirectToDashboard:true})
      }
      else if(res.data.errors){
        this.setState({errors:res.data.errors})
      }
    }).catch(err => console.log(err));
  };


  render() {

    // if(this.state.redirectToDashboard){
    //   return(<Redirect to="/dashboard" />)
    // }
    return (
      <div>
        <div className="container login-form">
        {this.state.errors.length > 0 ? this.state.errors.map((thing)=>{return(<p>thing</p>)}):""}
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
          <button onClick={this.handleFormSubmit}>Login</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Login;
