import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem, Modal} from 'react-bootstrap'
import './leaderboard.css'


export default class Leaderboard extends Component {
  state = {
    show: false
  }
  render() {
    const {users} = this.props
    users.sort((a,b) => b.score - a.score)

    return (
      <Panel>
        <Panel.Heading>Leaderboard</Panel.Heading>
        <ListGroup>
          {users.map(user => (
            <ListGroupItem>
              <div className='pull-left'>{user.username}</div>
              <div className='pull-right'>Score: {user.score}</div>
              <div className="clearfix"></div>
            </ListGroupItem>
          ))}

        </ListGroup>
      </Panel>
    )
  }
}
