import React, { Component } from 'react';

class Chatroom extends Component {
  constructor(props){
    super(props);
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