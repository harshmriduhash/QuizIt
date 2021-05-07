import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import QuestionTracker from '../QuestionTracker';
import Timer from '../Timer';
// import {Modal, CustomComponent} from 'react-bootstrap'
import './questionActive.css';

function createMarkup(string){
  return {__html: string};
}

export default class QuestionActive extends Component {

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

  componentWillUnmount(){
    // if(this.state.selectedAnswer){
    //   this.props.setAnswer(this.state.selectedAnswer,this.state.questionNum);
    // }
  }

  componentWillUpdate(nextProps,nextState){
    if(this.props.gameState === "questionActive" && nextProps.gameState === "intermission"){
      // console.log('if in componentWillUpdate');
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
        <div className="">
            <div className="question-title">
              <div className="centered questionNum-text">Question Number: {this.props.questionNum}/{this.state.totalQuestions}</div>
              <div className="centered question-text no-margin" dangerouslySetInnerHTML={createMarkup(question.question)}/>
            </div>
            <h2 className="centered custom-h2-margin animated pulse infinite">Choose an Answer</h2>
            <ListGroup>
              {answers.map((answer,index)=> (
                <ListGroupItem 
                  key={answer}
                  answer={answer}
                  index={index}
                  onClick={()=>{this.handleClick(answer,index)}}
                  className={index === this.state.activeIndex ? "currentAnswer answerHeight":"answerHeight"}
                  dangerouslySetInnerHTML={createMarkup(answer)}
                />
              ))}
            </ListGroup>
            
            <QuestionTracker className="questionTracker" difficulty={this.props.question.difficulty} category={this.props.category}></QuestionTracker>

        </div>
      )
    }
    if(this.props.gameState === "intermission"){
      return (
          <div className="">
            <div className="question-title">
              <div className="centered questionNum-text">Intermission Number: {this.props.questionNum}/{this.state.totalQuestions}</div>
              <div className="centered question-text no-margin" dangerouslySetInnerHTML={createMarkup(question.question)}/>
            </div>
            <h2 className="centered custom-h2-margin animated flipInY">
            {this.props.currentAnswer === this.props.correctAnswer ? "CORRECT" : "INCORRECT"}
            </h2>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem
                  key={answer}
                  onClick={()=>{this.doNothing()}}
                  className={
                    this.props.currentAnswer === this.props.correctAnswer && answer === this.props.correctAnswer ? "correct answerHeight animated tada" :
                    answer === this.props.correctAnswer ? "correctAnswer answerHeight animated flash" : 
                    answer === this.props.currentAnswer ? "incorrect answerHeight" : "answerHeight"
                  }
                  dangerouslySetInnerHTML={createMarkup(answer)}
                />
              ))}
            </ListGroup>
            <QuestionTracker className="questionTracker" difficulty={this.props.question.difficulty} category={this.props.category}></QuestionTracker>
            
        </div>
      )
    }
  }
}
