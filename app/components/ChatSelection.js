import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class ChatSelection extends Component {
  constructor(props){
    super(props)
    this.handleGlobalSearch = this.handleGlobalSearch.bind(this);
    this.handleLocalSearch = this.handleLocalSearch.bind(this);
    this.handleUserLocation = this.handleUserLocation.bind(this);
  }

handleUserLocation(e){

  e.preventDefault();

  var options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  var success = (pos) => {
    
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    this.handleLocalSearch(crd.latitude, crd.longitude);
  }

  var error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

handleGlobalSearch(e){

  e.preventDefault();

  axios.get('/findGlobalRoom')
  .then(res => {
    if (res.data.host) {
      console.log('No rooms available, you are the host.');
    }
    this.props.selectRoom(res.data.roomId);
  })
  .catch(error => {
    console.log(error);
  })

}

handleLocalSearch(lat, long){

  axios.get('/findLocalRoom', {
    params : {
      latitude : lat,
      longitude : long
    }
  })
  .then(res => {
    if (res.data.host) {
      console.log('No rooms available, you are the host.');
    } else {
      console.log(`Closest user found is ${res.data.distance} miles away.`);
    }
    this.props.selectRoom(res.data.roomId);
  })
  .catch(error => {
    console.log(error);
  })

}

  render() {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
    const buttonsInstance = (
    <div className="well" style={wellStyles}>
      <Button bsSize="large" block onClick={(e)=>this.handleGlobalSearch(e)}>Global Chat</Button>
      <Button bsSize="large" block onClick={(e)=>this.handleUserLocation(e)}>Local Chat</Button>
    </div>
    );
    return buttonsInstance;
  }
}

export default ChatSelection;
