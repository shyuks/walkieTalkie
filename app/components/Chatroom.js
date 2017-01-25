import React, { Component } from 'react';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <div>
      {`User: ${this.props.userId}, RoomId: ${this.props.roomId}`}
      </div>
    )
  }
}

export default Chatroom;