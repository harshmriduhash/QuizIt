import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import {Modal, CustomComponent} from 'react-bootstrap'
import './question.css'


export default class Leaderboard extends Component {
  state = {
    show: true
  }
  render() {

    const {question} = this.props
    console.log(question)
    const answers = question.incorrect_answers.concat(question.correct_answer)

    return (
      <div className="">

          <Panel>
            <Panel.Heading>{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem onClick={this.props.onAnswer}>{answer}</ListGroupItem>
              ))}
            </ListGroup>
          </Panel>

      </div>
    )
  }
}
