import React, { Component } from "react";
import API from "../../utils/API";
import {Redirect} from "react-router-dom";
// import Navbar from "../../components/Navbar";

class Register extends Component {
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
          this.setState({redirectToLogin:true});
        }
      }).catch(err => console.log(err));
    }
  };

  render() {
    if(this.state.redirectToLogin){
      return(<Redirect to="/" />)
    }
    return (
      <div className = "container poop mainContainer text-center">
        {this.state.errors.length > 0 ? this.state.errors.map((item,i)=>{return(<p key={i}>{item}</p>)}):""}
        <p className="max-center">Register</p>
        <form>
          <div>
          <input 
            name="username"
            onChange={this.handleInputChange}
            value={this.state.username}
            placeholder="username"
          />
          <div>
          </div>
          <input 
            name="email"
            onChange={this.handleInputChange}
            value={this.state.email}
            placeholder="email"
          />
          <div>
          </div>
          <input 
            name="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            placeholder="password"
            type="password"
          />
          <div>
          </div>
          <input 
            name="password2"
            onChange={this.handleInputChange}
            value={this.state.password2}
            placeholder="password2"
            type="password"
          />
          </div>
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
