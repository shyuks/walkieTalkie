import React, { Component } from 'react';
import axios from 'axios';
import AvailableInterests from './AvailableInterests.js';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UserInterests extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted : false,
      allInterests : [],
      selectedInterest : {}
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleInterestSelection = this.handleInterestSelection.bind(this);
    this.handleSaveInterest = this.handleSaveInterest.bind(this);
  }

  componentWillMount(){
    axios.get('/getAvailableInterests')
    .then(result => {
      axios.get('/getUserInterest', { params : {id : this.props.user}})
      .then(res => {
        res.data.forEach(int => {
          this.state.selectedInterest[int.id] = true;
        })
        this.setState({
          mounted : true,
          allInterests : result.data
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleInterestSelection(interestId){
    if (!this.state.selectedInterest.hasOwnProperty(interestId)) {
      this.state.selectedInterest[interestId] = true;
    } else {
      this.state.selectedInterest[interestId] = false;
    }
  }

  handleSaveInterest(){
    axios.post('/saveInterest', this.state.selectedInterest)
    .then(result => {
      this.props.toggleModal();
    })
    .catch(error => {
      console.log(error);
    })
  }

  render (){
    return (
        <Grid>
            <Row>
              
              {
                this.state.mounted ? 
                (
                  
                  <Col xs={8} md={8}>
                  <FormGroup >
                { 
                this.state.allInterests.map(interest => {
                  return <AvailableInterests
                          key = {interest.id}
                          checked = {this.state.selectedInterest[interest.id]} 
                          interest = {interest} 
                          toggleInterest = {this.handleInterestSelection}
                          />
                }) 
                }
                </FormGroup>
                <Col xs={6} md={6}>
                <Button onClick={this.handleSaveInterest}>Save</Button>
                </Col>
                <Col xs={6} md={6}>
                <Button onClick={this.props.toggleModal}>Cancel</Button>
                </Col>
                </Col>
                )
                : <div></div>
              }
              
            </Row>
          </Grid>
    )
  }
}

export default UserInterests;

