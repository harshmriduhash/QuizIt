import React, { Component } from "react";
import API from "../../utils/API";
import {Redirect} from "react-router-dom";
// import Navbar from "../../components/Navbar";
import "./MobileRegister.css"

class MobileRegister extends Component {
  state = {
    // name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    errors:[]
  };

  handleInputChange = event => {
    console.log('derp');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if(this.state.password !== this.state.password2){
      this.setState({errors:["Passwords do not match"]})
    }
    else{
      API.registerUser(this.state).then(res=>{
        console.log(res);
        if(res.data.errors){
          this.setState({errors:res.data.errors})
        }
        else{
          console.log(res);
          this.props.changePageToLogin();
        }
      }).catch(err => console.log(err));
    }
  };

  render() {
    return (
        <div class="container">
            <div class="card card-container">
                <h3>Log In</h3>
                <form class="form-signin">
                    <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus />
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                    <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
  }
}

export default MobileRegister;
