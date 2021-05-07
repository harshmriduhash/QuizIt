import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
// import io from 'socket.io-client';
import "./MobileLogin.css";
import socket from '../io';

class MobileLogin extends Component {

  state = {
    usernameLogin: "",
    passwordLogin: "",
    usernameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    password2Register: "",
    loginErrors:[],
    registerErrors:[],
    registerSuccess:"",
    endpoint: "localhost:3001",
    redirect:false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLoginSubmit = (event) => {
    //Stops page from reloading
    event.preventDefault();
    //Make user credentials object with just the values we need
    const userCreds = {
      username:this.state.usernameLogin,
      password:this.state.passwordLogin
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
        this.setState({loginErrors:res.data.errors})
      }
    })
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if(this.state.passwordRegister !== this.state.password2Register){
      this.setState({registerErrors:["Passwords do not match"]},()=>{
        console.log('passwords do not match');
      })
    }
    else{
      const userInfo = {
        username:this.state.usernameRegister,
        email:this.state.emailRegister,
        password:this.state.passwordRegister,
      }
      API.registerUser(userInfo).then(res=>{
        console.log(res);
        if(res.data.errors){
          this.setState({registerErrors:res.data.errors})
        }
        else{
          API.authenticateUser(userInfo).then(res=>{
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
              console.log(res.data.errors);
              this.setState({registerErrors:res.data.errors})
            }
          })
        }
      }).catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card no-padding card-custom nav-item-no-border">

          <ul className="nav nav-tabs nav-item-no-border" id="myTab" role="tablist">
            <li className="nav-item nav-item-custom nav-item-no-border">
              <a className="nav-link nav-link-background active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
            </li>
            <li className="nav-item nav-item-custom nav-item-no-border">
              <a className="nav-link nav-link-background" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Register</a>
            </li>
          </ul>

          <div className="tab-content card-container" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <form className="form-signin">
                <div className="mobile-form-text">Username</div>
                <input 
                  type="text" 
                  id="inputUsername" 
                  className="form-control" 
                  placeholder="Username"
                  required 
                  autoFocus
                  onChange={this.handleInputChange}
                  name="usernameLogin"
                  value={this.state.usernameLogin}
                />
                <div className="mobile-form-text">Password</div>
                <input 
                  type="password" 
                  id="inputPassword" 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="passwordLogin"
                  value={this.state.passwordLogin}
                />
              </form>
                <button 
                    className="btn btn-lg btn-primary btn-block btn-signin" 
                    type="submit" 
                    onClick={this.handleLoginSubmit}
                  >
                    Log in
                  </button>
                {this.state.loginErrors.length > 0 ? <div className="smol-top-margin text-center">{this.state.loginErrors.map((error,i)=>{return(<div className="error-text" key={i}>{error}</div>)})}</div>:""}
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <form className="form-signin">
                <div className="mobile-form-text">Username</div>
                <input 
                  type="text" 
                  id="inputUsernameRegister" 
                  className="form-control" 
                  placeholder="Username" 
                  required 
                  autoFocus 
                  onChange={this.handleInputChange}
                  name="usernameRegister"
                  value={this.state.usernameRegister}
                />
                <div className="mobile-form-text">Email</div>
                <input 
                  type="email" 
                  id="inputEmailRegister" 
                  className="form-control" 
                  placeholder="Email" 
                  required 
                  onChange={this.handleInputChange}
                  name="emailRegister"
                  value={this.state.emailRegister}
                />
                <div className="mobile-form-text">Password</div>
                <input 
                  type="password" 
                  id="inputPasswordRegister" 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="passwordRegister"
                  value={this.state.passwordRegister}
                />
                <div className="mobile-form-text">Confirm Password</div>
                <input 
                  type="password" 
                  id="inputPassword2Register" 
                  className="form-control" 
                  placeholder="Confirm Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="password2Register"
                  value={this.state.password2Register}
                />

              </form>
                <button 
                  className="btn btn-lg btn-primary btn-block btn-signin" 
                  type="submit"
                  onClick={this.handleRegisterSubmit}
                >
                  Register
                </button>
                {this.state.registerErrors.length > 0 ? <div className="smol-top-margin text-center">{this.state.registerErrors.map((error,i)=>{return(<div className="error-text" key={i}>{error}</div>)})}</div>:""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileLogin;

// <div className="text-center">
//   {this.props.loggedIn}
//   <div className="container">
//   {this.state.errors.length > 0 ? this.state.errors.map((item,i)=>{return(<p key={i}>{item}</p>)}):""}
//   <p className="max-center">Login</p>
//   <form>
//     <div>
//       <input 
//         name="username"
//         onChange={this.handleInputChange}
//         value={this.state.username}
//         placeholder="username"
//       />
//     </div>
//     <div>
//       <input 
//         name="password"
//         onChange={this.handleInputChange}
//         value={this.state.password}
//         placeholder="password"
//         type="password"
//       />
//     </div>
//     <button className="button-login" onClick={this.handleFormSubmit}>Login</button>
//   </form>
//   </div>
//   <button className="register-button" onClick={this.registerButton}>Register</button>
// </div>