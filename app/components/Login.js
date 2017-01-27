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

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginEmail : '',
      loginPassword: ''
    }
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
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

  render(){
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Form horizontal onSubmit={this.handleUserLogin}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel}>
                Email
                </Col>
                <Col >
                <FormControl type="email" placeholder="Email" value={this.state.loginEmail} onChange={this.handleLoginEmail} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} >
                Password
                </Col>
                <Col >
                <FormControl type="password" placeholder="Password" value={this.state.loginPassword} onChange={this.handleLoginPassword} required={true}/>
                </Col>
                </FormGroup>
                <FormGroup>
                <Col >
                <Button type="submit">
                Login
                </Button>
                </Col>
               </FormGroup>
               </Form>
            </Col>
            <Col >
              <Button onClick={()=> this.props.handleView()} type="submit">
              Signup
              </Button>
            </Col>
        </Row>
      </Grid>
    )
  }
}

export default Login;
