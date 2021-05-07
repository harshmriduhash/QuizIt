import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
import Register from "./pages/Register/";
import Logout from "./pages/Logout/";

class App extends Component {
  state = {
    loggedIn: false,
    // user:{},
    username: "",
    endpoint: "localhost:3001"
  }

  checkIfLoggedIn(){
    if(localStorage.user){
      this.setLoggedIn(true);
      return true
    }
    else{
      this.setLoggedIn(false);
      return false
    }
  }

  setLoggedIn = (arg) => {
    this.setState({
      loggedIn: arg
    });
  }

  // Broken state passing to Home.js
  // homeLoggedInTrue = (userInfo)=>{
  //   this.setState({loggedIn:true,user:userInfo},()=>{
  //     console.log('loggedIn '+this.state.loggedIn);
  //     console.log('user '+this.state.user);
  //   });
  // }
  // <Route exact path="/" render={()=>{return(<Home loggedIn={this.state.loggedIn} user={this.state.user} homeLoggedInTrue={this.homeLoggedInTrue} />)}} />

  //temporary clear function for testing socket
  componentWillMount(){
    // localStorage.clear();
  }

  render() {

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;