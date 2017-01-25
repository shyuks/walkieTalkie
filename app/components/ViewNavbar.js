import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

let ViewNavBar = ({logout, home}) => (
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
    </Navbar.Header>
      <Nav>
        <NavItem onClick={()=>logout()}>Logout</NavItem>
        <NavItem onClick={()=>home()}>Home</NavItem>
      </Nav>
  </Navbar>
)

export default ViewNavBar;