import React, { Component } from 'react';
import InterestsItem from './UserClickInterestsView'
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ChatLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: ['test', 'sean']
    }
  }
  //bind all functions here
    
  render() {
    var handleUserNameClick = (
      <Popover id="popover-trigger-click-root-close" title="User Interests">
        {this.state.interests.map((interest, index) => {
          return <ul key={index}><InterestsItem int={interest}/></ul>
        })}
        <Button onClick={this.privateChat}>Invite to Private Chat</Button>
      </Popover>
    );

    return (
    <div>
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={handleUserNameClick}>
          <b>{this.props.message.from}</b>
    </OverlayTrigger>: {this.props.message.body}
    </div>
    )
  }
}

export default ChatLineItem;