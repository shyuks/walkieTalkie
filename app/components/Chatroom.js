import React, { Component } from 'react';
import io from 'socket.io-client'

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    this.socket = io('/');
    this.socket.emit('join room', this.props.roomId);
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    })
  }

  handleMessageSubmit(event) {
    var body = event.target.value;
    if(event.keyCode === 13 && body) {
      var message = {
        body,
        from: this.props.name,
        room: this.props.roomId
      }
      this.setState({
        messages: [message, ...this.state.messages]
      })
      this.socket.emit('message', message)
      console.log('emmitting message back to server :', message);
      event.target.value = '';
    }
  } 

  render(){
    var messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from} : </b>{message.body}</li>
    })

    return (
      <div>
      <input type='text' placeholder='Enter a Message' onKeyUp={this.handleMessageSubmit} />
      {messages}
      </div>
    )
  }
}

export default Chatroom;