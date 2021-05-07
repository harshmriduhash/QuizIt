import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import QuestionTracker from '../QuestionTracker';
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Intermission.css';


export default class Intermission extends Component {

  state={
    timer:this.props.timer
  }

  render() {

    const {question} = this.props
    const answers = question.answers

    return (
      <div className="">
          <Panel className="questionList">
            <Panel.Heading className="centered question-text">{question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'')}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem
                  key={answer}
                  className={
                    this.props.currentAnswer === this.props.correctAnswer && answer === this.props.correctAnswer ? "correct centered" :
                    answer === this.props.correctAnswer ? "correctAnswer centered" : 
                    answer === this.props.currentAnswer ? "incorrect centered" : "centered"
                  }
                >
                  {answer}
                </ListGroupItem>
              ))}
            </ListGroup>
            <QuestionTracker questionNum={this.props.questionNum} totalQuestions={this.props.totalQuestions} category={this.props.category}> </QuestionTracker>
          </Panel>
      </div>
    )
  }
}
