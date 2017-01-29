import React, { Component } from 'react';
import UserInterestsItemized from './UserClickInterestsView.js';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ChatJoinModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      show : true,
      stateHeader : null,
      stateMessage : null

    }
    this.handleClose = this.handleClose.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    let searchOption, host, message, header;

    if (this.props.searchResults) {
    searchOption = this.props.searchResults.option;
    host = this.props.searchResults.res.host;

    if ((searchOption === 1 && host === true) || (searchOption === 2 && host === true)) {
      header = 'UH OH!';
      message = 'All rooms are full, you will now host a new one!';
    } else if (searchOption === 2) {
      header = 'FOUND!';
      message = `A user nearly ${Math.round(this.props.searchResults.res.distance)} miles away was found`;
    } else if (searchOption === 3) {
      header = 'PERFECT!';
      message = 'A user with these similar interest was found: '; 
    } else if (searchOption === 1 && host === false) {
      header = 'SUCCESS!';
      message = 'Room joined... try to find out where!'
    }
  }
    this.setState({
      stateHeader : header,
      stateMessage : message
    })
  }

  handleClose(){
    this.setState({
      show : false
    })
  }

  render(){
  return (
    <Modal show={this.state.show} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-lg">{this.state.stateHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{this.state.stateMessage}</h3>
        <div>
        {
          this.props.searchResults.res.interest ? (
            this.props.searchResults.res.interest.map((i, index) => {
              return < UserInterestsItemized key={index} int={i.interest} />
            })
          ) : (<div></div>)
        }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleClose}>Start Chat</Button>
      </Modal.Footer>
    </Modal>
  )    
  }
}

export default ChatJoinModal;