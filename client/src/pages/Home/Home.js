import React, { Component } from "react";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import ReactSwipe from 'react-swipe';
// import Sound from "react-sound";
import API from "../../utils/API";
// import {Redirect} from "react-router-dom";
import socket from '../../components/io';
import Login from '../../components/Login';
import Pregame from '../../components/Pregame';
import QuestionActive from '../../components/QuestionActive';
import Intermission from '../../components/Intermission';
import GameEnd from '../../components/GameEnd';
import Timer from '../../components/Timer';
import Loading from "../../components/Loading";
import CurrentQuestions from "../../components/CurrentQuestions";
import Chatroom from "../../components/Chatroom";
import Navbar from "../../components/Navbar";
import Voting from "../../components/Voting";
import Profile from "../../components/Profile";
import { Modal, Button } from "react-bootstrap";
import classNames from "classnames";
// Mobile components
import MobileQuestionActive from '../../components/MobileQuestionActive';
import MobileTimer from "../../components/MobileTimer";
import MobileChatroom from "../../components/MobileChatroom";
import MobileNavbar from "../../components/MobileNavbar";
import MobileLogin from "../../components/MobileLogin";
import MobileRegister from "../../components/MobileRegister";
import MobilePregame from "../../components/MobilePregame";
import MobileVoting from "../../components/MobileVoting";
import MobileProfile from "../../components/MobileProfile";
import MobileLeaderboard from "../../components/MobileLeaderboard";
import './Home.css';

class Home extends Component {
  state = {
    loading:true,
    loggedIn: false,
    currentPage: "login",
    user:{},
    errors:[],
    gameState: "loading",
    question: {},
    currentAnswer:"",
    correctAnswer: "",
    timer:0,
    users:[],
    questionNum:0,
    totalQuestions:0,
    scores:[],
    category: "",
    votingCategories:[],
    showProfile: false
  };

  componentWillMount() {
    if(localStorage.jwt){
      API.getProfileInfo(localStorage.jwt).then(res=>{
          // console.log(res);
          res.data.user.id = res.data.user._id;
          setTimeout(()=>{
            this.setState({loggedIn:true,loading:false,user:res.data.user},()=>{
              console.log('loggedIn is '+this.state.loggedIn);
            });
          },1000)

          var socketParams = {
            user:res.data.user,
            room:'master'
          }
          socket.emit('loggedIn',socketParams);
        }
      ).catch(err=>{
        console.log(err);
        setTimeout(()=>{
          this.setState({loggedIn:false,loading:false},()=>{
            console.log('loggedIn is '+this.state.loggedIn);
          });
        },1000)
      })
    }
    else{
      this.setState({loggedIn:false,loading:false});
    }
  }

  componentDidMount(){
    //Used for yarn start
    socket.on('gameState', (msg) => {
      // console.log(msg);
      //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
      this.setState({timer:msg.timer});
      if(this.state.gameState !== msg.gameState){
        this.setState({
          gameState:msg.gameState,
          question:msg.question,
          correctAnswer:msg.correctAnswer,
          questionNum:msg.questionNum,
          totalQuestions:msg.totalQuestions,
          scores:msg.scores,
          category:msg.category,
          votingCategories:msg.votingCategories
        },()=>{
          // console.log(this.state.votingCategories);
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.gameState === "pregame" && this.state.gameState != "pregame"){
      this.setState({answers:[],gameState:"pregame"});
      console.log('cleared answers upon newGame AKA pregame');
    }
    if(nextState.gameState !== this.state.gameState){
      API.getProfileInfo(localStorage.jwt).then(res=>{
        this.setState({user:res.data.user})
      })
    }
  }

  loggedInTrue = (userInfo)=>{
    this.setState({loggedIn:true,user:userInfo},()=>{
      console.log('loggedIn '+this.state.loggedIn);
      console.log('user '+this.state.user);
    });
  }

  setAnswer = (answer)=>{
    this.setState({currentAnswer:answer},()=>{
      var answerObj = {
        id: this.state.user._id, //Allow login to update state.id later
        username: this.state.user.username, //Allow login to update state.name later
        answer: this.state.currentAnswer, //True and False are strings as well
        questionNum: this.state.questionNum, //0-9 to match question array position
        timer: this.state.timer, //Time the user selects answer. will be 0 if they switched answers
        room: 'master', //Will be 'master' until multiple rooms
        answered: true
      }
      console.log(answerObj);
      socket.emit('answer',answerObj);
    });
  }

  // Renders game components inside quizitPlayground.
  renderStuff = ()=>{
      if(this.state.loading){
        return(<Loading />)
      }
      else{
        if(!this.state.loggedIn){
          return(
            <MobileLogin loggedInTrue={this.loggedInTrue} />
          )
        }
        else{
          if(this.state.gameState === 'pregame'){
            return(
              <Pregame />
            )
          }
          else if(this.state.gameState === 'questionActive'){
            return(
              <QuestionActive
                question={this.state.question}
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                setAnswer={this.setAnswer}
                timer={this.state.timer}
                category={this.state.category}
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'intermission'){
            return(
              <QuestionActive
                question={this.state.question}
                correctAnswer={this.state.correctAnswer}
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                currentAnswer={this.state.currentAnswer}
                timer={this.state.timer}
                category={this.state.category}
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'gameEnd'){
            return(
              <GameEnd scores={this.state.scores} />
            )
          }
          else if(this.state.gameState === 'voting'){
            return(
              <Voting
                votingCategories={this.state.votingCategories}
                userId={this.state.user.id}
              />
            )
          }
          else if(this.state.gameState === 'loading'){
            console.log(this.state.gameState);
            return(
              <Loading />
            )
          }
        }
      }
  }

  renderMobileStuff = ()=>{
      if(this.state.loading){
        return(<Loading />)
      }
      else{
        if(!this.state.loggedIn){
          return(
            <MobileLogin loggedInTrue={this.loggedInTrue} />
          )
        }
        else{
          if(this.state.gameState === 'pregame'){
            console.log('pregame');
            return(
              <MobilePregame timer={this.state.timer}/>
            )
          }
          else if(this.state.gameState === 'questionActive'){
            return(
              <MobileQuestionActive
                question={this.state.question}
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                setAnswer={this.setAnswer}
                timer={this.state.timer}
                category={this.state.category}
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'intermission'){
            return(
              <MobileQuestionActive
                question={this.state.question}
                correctAnswer={this.state.correctAnswer}
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                currentAnswer={this.state.currentAnswer}
                timer={this.state.timer}
                category={this.state.category}
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'gameEnd'){
            return(
              <MobileLeaderboard scores={this.state.scores} gameState={this.state.gameState} timer={this.state.timer} />
            )
          }
          else if(this.state.gameState === 'voting'){
            return(
              <MobileVoting
                votingCategories={this.state.votingCategories}
                userId={this.state.user.id}
                timer={this.state.timer}
              />
            )
          }
          else if(this.state.gameState === 'loading'){
            console.log(this.state.gameState);
            return(
              <Loading />
            )
          }
        }
      }
  }

  // Renders timer inside quizitPlayground
  renderTimer = ()=>{
    if(this.state.loggedIn){
      if(this.state.gameState!='loading'){
        return(<Timer timer={this.state.timer} gameState={this.state.gameState}/>)
      }
    }
  }

  // Renders left div. You can render a specific component and pass props like so.
  renderLeft = ()=>{
    return null
    if(this.state.loggedIn){
      return(<Profile user={this.state.user} />)
    }
  }

  // Renders right div. You can render a specific component and pass props like so.
  renderRight = ()=>{
    if(this.state.loggedIn){
      return(<Chatroom user={this.state.user} socket={socket}/>)
    }
  }

  renderMobileChat = ()=>{
    return(<MobileChatroom user={this.state.user} socket={socket} />)
  }

  renderMobileProfile = ()=>{
    return(<MobileProfile user={this.state.user} />)
  }

  // handleSongLoading = ()=>{
  //   console.log('loading');
  // }

  // handleSongPlaying = ()=>{
  //   console.log('playing');
  // }

  // handleSongFinishedPlaying = ()=>{
  //   console.log('finishedPlaying');
  // }

  showProfileModal = () => {
    this.setState({
      showProfile: true
    })
  }

  hideProfileModal = () => {
    this.setState({
      showProfile: false
    })
  }


  render() {
    const modalStyle = { display: this.state.showProfile ? 'block' : 'none' }
    return (
      <div>
        <BrowserView device={isBrowser}>
          <Navbar loggedIn={this.state.loggedIn} showProfile={this.showProfileModal} user={this.state.user}/>
          <div className={classNames(["modal", "fade"], { "show": this.state.showProfile })} role="dialog" style={modalStyle}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true"></span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <Profile user={this.state.user}/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.hideProfileModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          <div className="container-fluid browser-container">
            <div className="row pushDown"></div>
            <div className="row">
              <div className="col col-lg-2 quizitLeft">
                {this.renderLeft()}
              </div>
              <div className="col col-lg-8 quizitCenter">
                  <div className = "quizitPlayground vh-center">
                    <div className="quizitPlaygroundTop">{this.renderStuff()}</div>
                    <div className="quizitPlaygroundBottom">{this.renderTimer()}</div>
                  </div>
              </div>
              <div className="col col-lg-2 quizitRight">
                {this.renderRight()}
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView device={isMobile}>
          <div className="mobile-landscape-detector">Please play this game in portrait layout. AKA hold your phone UP</div>
          <MobileNavbar loggedIn={this.state.loggedIn}/>
          {this.state.loggedIn ?
            <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
              <div className="mobile-container">
                {this.renderMobileProfile()}
              </div>
              <div className="mobile-container">
                {this.renderMobileStuff()}
              </div>
              <div className="mobile-container">
                {this.renderMobileChat()}
              </div>
            </ReactSwipe>
            :
            <div className="mobile-container">
              {this.renderMobileStuff()}
            </div>
          }
        </MobileView>
      </div>
    );
  }
}

export default Home;

// <Sound
//           url="/assets/sound/BlueSkies.mp3"
//           playStatus={Sound.status.PLAYING}
//           // playFromPosition={0 /* in milliseconds */}
//           onLoading={this.handleSongLoading}
//           onPlaying={this.handleSongPlaying}
//           onFinishedPlaying={this.handleSongFinishedPlaying}
//           />
