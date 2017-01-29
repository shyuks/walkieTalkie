import React, { Component } from 'react';
import axios from 'axios';
import InterestsItem from './UserClickInterestsView'
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ChatLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
    }
  //bind all functions here
  this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get('/getUserInterest', { params : {id : this.props.message.user}})
    .then(res => {
      this.setState({
        interests: res.data
      })
    })
    .catch(err => {
      console.log('error in getting users interest: ', err);
    })
  }
    
  render() {
    var addPopover = (
      <Popover id="popover-trigger-click-root-close" title="User Interests">
        {this.state.interests.map((interest, index) => {
          return <ul key={index}><InterestsItem int={interest.Interest}/></ul>
        })}
        <Button onClick={(e) => {this.props.privateChat(this.props.message.socketId, this.props.message.from)}}>Invite to Private Chat</Button>
      </Popover>
    );

    return (
    <div>
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={addPopover}>
          <b>{this.props.message.from}</b>
    </OverlayTrigger>: {this.props.message.body}
    </div>
    )
  }
}

export default ChatLineItem;