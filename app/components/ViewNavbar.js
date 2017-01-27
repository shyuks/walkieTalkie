import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import UserInterests from './UserInterests'

class ViewNavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      show : false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      show : !this.state.show
    })
  }

  render(){
  return (
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
  </Navbar.Header>
    <Nav>
      <NavItem onClick={this.props.logout}>Logout</NavItem>
      <NavItem onClick={this.props.home}>Home</NavItem>
      {this.props.userId ?
      <NavItem onClick={this.toggleModal}>Interest
      <Col xs={12} md={12}>

        <Modal show={this.state.show} dialogClassName="custom-modal">
        <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">You Interests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserInterests user={this.props.userId} toggleModal={this.toggleModal}/>
          </Modal.Body>
        </Modal>
      </Col>

      </NavItem>
      :
      <NavItem></NavItem>
      }
    </Nav>
  </Navbar>
  )
  }
}


export default ViewNavBar;