import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class ChatSelection extends Component {
  constructor(props){
    super(props)
    this.handleGlobalSearch = this.handleGlobalSearch.bind(this);
    this.handleLocalSearch = this.handleLocalSearch.bind(this);
    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleInterestSearch = this.handleInterestSearch.bind(this);
  }

handleUserLocation(e, selection){
  e.preventDefault();
  let options = {
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0
  };

  let success = (pos) => {
    
    let crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    
    if (selection === 'local') {
      this.handleLocalSearch(crd.latitude, crd.longitude);
    } else {
      this.handleGlobalSearch(crd.latitude, crd.longitude);
    }
  }

  let error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

handleGlobalSearch(lat, long){
  axios.get('/findGlobalRoom', {
    params : {
      latitude : lat,
      longitude : long
    }
  })
  .then(res => {
    this.props.selectRoom(res.data.roomId, 1, {'host' : res.data.host});
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
    this.props.selectRoom(res.data.roomId, 2, {'host' : res.data.host, 'distance' : res.data.distance});
  })
  .catch(error => {
    console.log(error);
  })
}

handleInterestSearch(){
  axios.get('/findCommonUser')
  .then(result => {
    if (!result.data) {
      console.log('User with common interests are not available, try local chat');
    } else {
      this.props.selectRoom(result.data.roomId, 3, {'interest':result.data.interests});
    }
  })
  .catch(error => {
    console.log(error);
  })
}

  render() {
    const wellStyles = {maxWidth: 500, margin: '0 auto 10px'};
    const buttonsInstance = (
    <div className="well" style={wellStyles}>
      <Button bsSize="large" block onClick={(e)=>this.handleUserLocation(e, 'global')}>Global Chat</Button>
      <Button bsSize="large" block onClick={(e)=>this.handleUserLocation(e, 'local')}>Local Chat</Button>
      <Button bsSize="large" block onClick={this.handleInterestSearch}>Interest Chat</Button>
    </div>
    );
    return buttonsInstance;
  }
}

export default ChatSelection;
