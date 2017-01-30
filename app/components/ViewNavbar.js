import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
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
      {this.props.userId ?
        <div>    
          <Navbar.Header>
              <Navbar.Brand>
                walkieTalkie
              </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={this.props.home}>Home</NavItem>
              <NavItem onClick={this.toggleModal}>Interest</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem onClick={this.props.logout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        {
          this.state.show ? 
          (<UserInterests show={this.state.show} 
                          user={this.props.userId} 
                          toggleModal={this.toggleModal} />)
          : (<div></div>)
        }
        </div>
        :
        <NavItem></NavItem>
        }
  </Navbar>
  )
  }
}

export default ViewNavBar;