import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

class ViewNavBar extends Component {
  constructor(props){
    super(props)
    this.handleMapView = this.handleMapView.bind(this);
  }

  handleMapView(){
    
  }

  render(){
    return (
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
    </Navbar.Header>
      <Nav>
        <NavItem onClick={()=>this.props.logout()}>Logout</NavItem>
        <NavItem onClick={()=>this.props.home()}>Home</NavItem>
        <NavItem onClick={()=>this.handleMapView()}>Map</NavItem>
      </Nav>
   </Navbar>
    )
  }
}

export default ViewNavBar;