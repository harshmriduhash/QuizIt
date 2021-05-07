import React, { Component } from "react";
import {Redirect} from "react-router-dom";

class Logout extends Component {

  state={
    redirect:false
  }

  componentWillMount() {
    localStorage.clear();
    setTimeout(()=>{
      this.setState({redirect:true})
    },2000)    
  }

  render() {
    if(this.state.redirect){
      return(
        <Redirect to="/" />
      )
    }
    else{
      return (
        <div>
          <p>Logout</p>
          <div>
            You've been logged out.
          </div>
        </div>
      );
    }
  }
}

export default Logout;
