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
    this.handlePrivateChat = this.handlePrivateChat.bind(this);
  }

  componentWillMount() {
    this.socket = io('/');
    this.socket.emit('join room', this.props.roomId);
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      });
    })
    this.socket.on('requestModal', ownSocketId => {
      console.log('the result from invite is: ', ownSocketId);
    })
  }

  handleMessageSubmit(event) {
    var body = event.target.value;
    if(event.keyCode === 13 && body) {
      var message = {
        body,
        from: this.props.name,
        room: this.props.roomId,
        user: this.props.userId,
        socketId: this.socket.json.id
      }
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      })
      this.socket.emit('message', message)
      console.log('emitting message back to server :', message);
      event.target.value = '';
    }
  }

  handlePrivateChat(recipientSocketId) {
    console.log('requesting private chat with', recipientSocketId);
    this.socket.emit('privateRequest', recipientSocketId);
  };


  render(){
    var messages = this.state.messages.map((message, index) => {
      return <ul key={index}><ChatLine message={message} privateChat={this.handlePrivateChat}/></ul>
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