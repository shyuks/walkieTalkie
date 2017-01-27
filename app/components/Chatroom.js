import React, { Component } from 'react';
import ChatLine from './ChatLineItem';
import io from 'socket.io-client';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      showRequest: false,
      rejected: false,
      privateData: {}
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePrivateChat = this.handlePrivateChat.bind(this);
    this.acceptPrivateChat = this.acceptPrivateChat.bind(this);
    this.declinePrivateChat = this.declinePrivateChat.bind(this);
    this.acceptRejection = this.acceptRejection.bind(this);
    this.joinPrivate = this.joinPrivate.bind(this);
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.emit('join room', this.props.roomId);
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      });
    });
    this.socket.on('requestModal', privChatData => {
      console.log('privChatData in requestModal: ', privChatData)
      this.setState({
        privateData: privChatData,
        showRequest: true
      });
    });
    this.socket.on('join private', privChatData => {
      console.log('joining newly created room', privChatData);
      this.state.privateDate = privChatData;
      this.joinPrivate();
    });
    this.socket.on('declined', privChatData => {
      console.log('private chat data in declined ', privChatData);
      this.setState({
        privateData: privChatData,
        rejected: true
      })
    })
  };

  handleMessageSubmit(event) {
    var body = event.target.value;
    if(event.keyCode === 13 && body) {
      var message = {
        body,
        from: this.props.name,
        room: this.props.roomId,
        user: this.props.userId,
        socketId: this.socket.json.id
      };
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      });
      this.socket.emit('message', message);
      event.target.value = '';
    }
  }

  handlePrivateChat(recipSID, recipName) {
    this.socket.emit('privateRequest', {
      receiver: recipSID,
      receiverName: recipName,
      sender: this.socket.json.id,
      senderName: this.props.name
    });
  };

  acceptPrivateChat() {
    axios.post('/privateRoom', {id : this.state.privateData.receiver})
      .then(res => {
        console.log(res)
        this.socket.emit('acceptRequest', this.state.privateData)
      })
      .then(rerender => {
        console.log('running the roomchange');
        this.props.roomChange(this.state.privateData.receiver)
      })
      .catch(err => {
        console.log('error in creating private chat axios post: ', err);
      })
  };

  declinePrivateChat() {
    this.socket.emit('declineRequest', this.state.privateData);
    this.setState({
      showRequest: false
    });
  };

  joinPrivate() {
    axios.post('/privateRoom', {id : this.state.privateData.receiver})
      .then(res => {
        console.log(res)
        this.props.roomChange(this.state.privateData.receiver)
      })
      .catch(err => {
        console.log('error in creating private chat axios post: ', err);
      })
  };

  acceptRejection() {
    this.setState({
      rejected: false
    });
  };

  render(){
    var messages = this.state.messages.map((message, index) => {
      return <ul key={index}><ChatLine message={message} privateChat={this.handlePrivateChat}/></ul>
    })

    console.log(this.props.roomId)
      return (
      <div>
        <Modal show={this.state.showRequest} dialogClassName="custom-modal">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Private Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.state.privateData.senderName} would like to start a private chat.</h3>
            <Button onClick={this.acceptPrivateChat}>Accept</Button>
            <Button onClick={this.declinePrivateChat}>Decline</Button>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.rejected} dialogClassName="custom-modal">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Private Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.state.privateData.receiverName} has rejected your chat request.</h3>
            <Button onClick={this.acceptRejection}>OK</Button>
          </Modal.Body>
        </Modal>

        {messages}
        <input type="text" placeholder="Enter a Message" onKeyUp={this.handleMessageSubmit} />
      </div>
    )
    }
}

export default Chatroom;