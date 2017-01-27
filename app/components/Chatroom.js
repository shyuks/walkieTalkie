import React, { Component } from 'react';
import ChatLine from './ChatLineItem';
import io from 'socket.io-client';
import { Popover } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
  }

  componentWillMount() {
    this.socket = io('/');
    this.socket.emit('join room', this.props.roomId);
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      });
    })
  }

  handleMessageSubmit(event) {
    var body = event.target.value;
    if(event.keyCode === 13 && body) {
      var message = {
        body,
        from: this.props.name,
        room: this.props.roomId,
        user: this.props.userId
      }
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      })
      this.socket.emit('message', message)
      console.log('emmitting message back to server :', message);
      event.target.value = '';
    }
  }

  handleUsernameClick(userId) {
    //on click of name display that user's interests and option for private chat

    
  }

  render(){
    console.log('this is the socket', this.socket.json.id);
    var messages = this.state.messages.map((message, index) => {
      return <ul key={index}><ChatLine message={message}/></ul>
    })

    return (
      <div>
      {messages}
      <input type="text" placeholder="Enter a Message" onKeyUp={this.handleMessageSubmit} />
      </div>
    )
  }
}

export default Chatroom;