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
    //creating a socket connection
    this.socket = io('/');
    
    //join a room upon connection
    this.socket.emit('join room', this.props.roomId);
    console.log('this is the room after mounting: ', this.props.roomId)
    
    
    //listener for any incoming messages via socket
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages].slice(0, 50)
      });
    });

    //listener for the receiver of a private chat request
    this.socket.on('requestModal', pcData => {
      this.setState({
        privateData: pcData,
        showRequest: true
      });
    });

    //listener for sender to join private room that the receiver has created upon acceptance
    this.socket.on('join private', pcData => {
      console.log('joining newly created room', pcData);
      this.setState({
        privateData: pcData
      })
      this.joinPrivate();
    });

    //listener for sender to see their offer has been declined
    this.socket.on('declined', pcData => {
      console.log('private chat data in declined ', pcData);
      this.setState({
        privateData: pcData,
        rejected: true
      })
    })
  };

  //handle all message submissions
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

  //handle a private chat request click (initiated by user)
  handlePrivateChat(recipSID, recipName) {
    this.socket.emit('privateRequest', {
      receiver: recipSID,
      receiverName: recipName,
      sender: this.socket.json.id,
      senderName: this.props.name
    });
  };

  //accept a received private chat request
  acceptPrivateChat() {
    //leave current room before joining new room
    this.socket.emit('leaveRoom', this.props.roomId);
    var priv = this.state.privateData
    axios.post('/privateRoom', {id : priv.receiver})
      .then(res => {
        //emit to socket that the request has been accepted
        this.socket.emit('acceptedRequest', priv);
        //initiate a room change in parent
        this.props.roomChange(priv.receiver);
        this.setState({
          messages: [],
          showRequest: false
        })
      })
      .then(check => {
        console.log('checking room after accepting private chat: ', this.props.roomId)
      })
      .catch(err => {
        console.log('error in creating private chat axios post: ', err);
      })
  };

  //decline a received private chat request
  declinePrivateChat() {
    this.socket.emit('declineRequest', this.state.privateData);
    this.setState({
      showRequest: false
    });
  };


  //sender joins the private chat after receiver accepted and created a room
  joinPrivate() {
    //leave current room before joining new private room
    this.socket.emit('leaveRoom', this.props.roomId);
    var priv = this.state.privateData
    axios.post('/privateRoom', {id : priv.receiver})
      .then(res => {
        console.log('this is the room in joinPrivate ', priv.receiver)
        console.log(res)
        this.props.roomChange(priv.receiver);
        this.setState({
          messages: []
        })
      })
      .catch(err => {
        console.log('error in creating private chat axios post: ', err);
      })
  };

  //close rejection modal
  acceptRejection() {
    this.setState({
      rejected: false
    });
  };

  render(){
    var messages = this.state.messages.map((message, index) => {
      return <ul key={index}><ChatLine message={message} privateChat={this.handlePrivateChat}/></ul>
    })

    console.log('this is the room you are in ', this.props.roomId)
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