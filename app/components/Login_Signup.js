import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class UserLoginSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginEmail : '',
      loginPassword: '',
      signupEmail : '',
      signupFirstName : '',
      signupLastName : '',
      signupPassword : ''
    }
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserSignup = this.handleUserSignup.bind(this);
    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleSignupEmail = this.handleSignupEmail.bind(this);
    this.handleSignupPassword = this.handleSignupPassword.bind(this);
    this.handleSignupFirtName = this.handleSignupFirtName.bind(this);
    this.handleSignupLastName = this.handleSignupLastName.bind(this);
  }

  handleLoginEmail(e){
    this.setState({
      loginEmail : e.target.value
    })
  }

  handleLoginPassword(e){
    this.setState({
      loginPassword: e.target.value
    })
  }

  handleSignupEmail(e){
    this.setState({
      signupEmail : e.target.value
    })
  }

  handleSignupPassword(e){
    this.setState({
      signupPassword : e.target.value
    })
  }

  handleSignupFirtName(e){
    this.setState({
      signupFirstName : e.target.value
    })
  }

  handleSignupLastName(e){
    this.setState({
      signupLastName : e.target.value
    })
  }

  handleUserLogin(event){

    event.preventDefault();

    var userInfo = {
      email : this.state.loginEmail,
      password : this.state.loginPassword
    }
    var self = this;

    axios.post('/login', userInfo)
    .then(result => {
      if (result) {
        self.props.userSignupLogin(result.data);
      } else {
        console.log('Incorrect Email or Password');
      }
    })
    .catch(err => {
      console.log('Error Loging in', err);
    })
  }

  handleUserSignup(event){
    var self = this;
    event.preventDefault();

    var userInfo = {
      email : this.state.signupEmail,
      firstname : this.state.signupFirstName,
      lastname : this.state.signupLastName,
      password : this.state.signupPassword
    }

    axios.post('/signup', userInfo)
    .then(result => {
      console.log('result :', result)
      if (result.data.createdAt) {
        self.props.userSignupLogin(result.data);
      } else {
        console.log('Email already Taken');
      } 
    })
    .catch(err => {
      console.log('Caught error in signup', err);
    })
  }

  render(){
    return (
      <Grid>
        <Row>
          <Col xs={6} md={6}>
            <Form horizontal onSubmit={this.handleUserLogin}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                Email
                </Col>
                <Col sm={10}>
                <FormControl type="email" placeholder="Email" value={this.state.loginEmail} onChange={this.handleLoginEmail} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                Password
                </Col>
                <Col sm={10}>
                <FormControl type="password" placeholder="Password" value={this.state.loginPassword} onChange={this.handleLoginPassword} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="submit">
                Login
                </Button>
                </Col>
             </FormGroup>
          </Form>
          </Col>
          <Col xs={6} md={6}>
            <Form horizontal onSubmit={this.handleUserSignup}>
               <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                Email
                </Col>
                <Col sm={10}>
                <FormControl type="email" placeholder="Email" value={this.state.signupEmail} onChange={this.handleSignupEmail} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
                First Name
                </Col>
                <Col sm={10}>
                <FormControl type="name" placeholder="First Name" value={this.state.signupFirstName} onChange={this.handleSignupFirtName} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                Last Name
                </Col>
                <Col sm={10}>
                <FormControl type="name" placeholder="Lastname" value={this.state.signupLastName} onChange={this.handleSignupLastName} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                Password
                </Col>
                <Col sm={10}>
                <FormControl type="password" placeholder="Password" value={this.state.signupPassword} onChange={this.handleSignupPassword} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="submit">
                Sign Up
                </Button>
                </Col>
             </FormGroup>
          </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UserLoginSignup;
