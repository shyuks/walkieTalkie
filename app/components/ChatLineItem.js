import React, { Component } from 'react';
import axios from 'axios';
import InterestsItem from './UserClickInterestsView'
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class ChatLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
    }
  //bind all functions here
  this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    return (
      <div>
        <p><strong>{this.props.message.from}: </strong>{this.props.message.body}</p>
      </div>
    )
  }
}

export default ChatLineItem;