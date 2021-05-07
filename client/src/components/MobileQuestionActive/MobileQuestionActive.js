import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import MobileTimer from '../MobileTimer';
// import {Modal, CustomComponent} from 'react-bootstrap'
import MobileSwipeGuide from "../MobileSwipeGuide";
import './MobileQuestionActive.css';

function removeEntertainment(string){
  return string.replace('Entertainment: ', '');
}

function createMarkup(string){
  return {__html: string};
}

function renderDifficulty(string){
  if(string){
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
  else{
      return;
  }
}

export default class MobileQuestionActive extends Component {

  state={
    questionNum:this.props.questionNum,
    totalQuestions:this.props.totalQuestions,
    timer:this.props.timer,
    category: this.props.category,
    selectedAnswer:"",
    timeClicked:0,
    activeIndex: -1,
    gameState:this.props.gameState
  }

  componentWillUpdate(nextProps,nextState){
    if(this.props.gameState === "questionActive" && nextProps.gameState === "intermission"){
      this.setState({activeIndex:-1});
    }
  }

  handleClick = (answer,index)=>{
    console.log('Clicked '+answer);
    this.setState({selectedAnswer:answer,activeIndex:index},()=>{
      console.log('active index '+index);
    });
    this.props.setAnswer(answer);
  }

  doNothing = ()=>{
    console.log('nothing');
  }

  render() {

    const {question} = this.props
    const answers = question.answers

    // {question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'')}
    if(this.props.gameState === "questionActive"){
      return (
        <div className="mobileHeight">
          <div className="mobile-question-title">
            <div className="centered mobile-top-banner-text">Question Number: {this.props.questionNum}/{this.state.totalQuestions}</div>
            <div className="centered mobile-question-text animated bounceIn" dangerouslySetInnerHTML={createMarkup(question.question)}/>
          </div>
          <ListGroup className="list-group-mobile">
            {answers.map((answer,index)=> (
              <ListGroupItem 
                key={answer}
                answer={answer}
                index={index}
                onClick={()=>{this.handleClick(answer,index)}}
                className={index === this.state.activeIndex ? "mobile-currentAnswer mobile-answer-box":"mobile-answer-box"}
                dangerouslySetInnerHTML={createMarkup(answer)}
              />
            ))}
          </ListGroup>
          <div className="mobile-box-details">
            <div className="mobile-box-category">{removeEntertainment(this.props.category)}</div>
            <div className="mobile-box-difficulty">{renderDifficulty(this.props.question.difficulty)}</div>
          </div>
          <div className="clear-float"/>
          <h4 className="centered animated pulse infinite mobile-question-active-h4">Choose an Answer</h4>
          <MobileTimer timer={this.props.timer} gameState={this.props.gameState}/>
          <MobileSwipeGuide right={{show:true,text:"Chat"}} left={{show:true,text:"Profile"}}/>
        </div>
      )
    }
    if(this.props.gameState === "intermission"){
      return (
        <div className="mobileHeight">
          <div className="mobile-question-title">
            <div className="centered mobile-top-banner-text">Intermission Number: {this.props.questionNum}/{this.state.totalQuestions}</div>
            <div className="centered mobile-question-text" dangerouslySetInnerHTML={createMarkup(question.question)}/>
          </div>
          <ListGroup className="list-group-mobile">
            {answers.map(answer => (
              <ListGroupItem
                key={answer}
                onClick={()=>{this.doNothing()}}
                className={
                  this.props.currentAnswer === this.props.correctAnswer && answer === this.props.correctAnswer ? "mobile-correct mobile-answer-box animated tada" :
                  answer === this.props.correctAnswer ? "mobile-correctAnswer mobile-answer-box animated flash" : 
                  answer === this.props.currentAnswer ? "mobile-incorrect mobile-answer-box" : "mobile-answer-box"
                }
                dangerouslySetInnerHTML={createMarkup(answer)}
              />
            ))}
          </ListGroup>
          <div className="mobile-box-details">
            <div className="mobile-box-category">{removeEntertainment(this.props.category)}</div>
            <div className="mobile-box-difficulty">{renderDifficulty(this.props.question.difficulty)}</div>
          </div>
          <div className="clear-float"/>
          <h4 className="centered animated flipInY mobile-question-active-h4">
          {this.props.currentAnswer === this.props.correctAnswer ? "CORRECT" : "INCORRECT"}
          </h4>
          <MobileTimer timer={this.props.timer} />
          <MobileSwipeGuide right={{show:true,text:"Chat"}} left={{show:true,text:"Profile"}}/>
        </div>
      )
    }
  }
}
