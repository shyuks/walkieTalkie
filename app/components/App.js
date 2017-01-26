import React from 'react';
import axios from 'axios';
import UserLoginSignup from './Login_Signup.js';
import ViewNavBar from './ViewNavbar.js';
import Chatroom from './Chatroom.js';
import ChatSelection from './ChatSelection.js';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userId : null,
      roomId : null,
      login_signup_view : true,
      chat_view : false,
      mounted : false
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleUserSignupLogin = this.handleUserSignupLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.handleChatSelection = this.handleChatSelection.bind(this);
    this.handleChatExit = this.handleChatExit.bind(this);
  }

  componentWillMount(){
   axios.get('/checkSession')
   .then(res => {
     if (res.data.id) {
      if (res.data.roomId) {
        this.setState({
          userId : res.data.id,
          roomId : res.data.roomId,
          mounted : true,
          login_signup_view : false,
          chat_view : true
        })
      } else {
        this.setState({
          userId : res.data.id,
          mounted : true,
          login_signup_view : false
        })
      }
     } else {
       this.setState({
         mounted : true
       })
     }
   })
   .catch(err => {
     console.log(err);
   })
  }

 handleUserSignupLogin(res){
   this.setState({
     userId : res.id,
     login_signup_view  : false
   })
 }

 handleUserLogout(){
   var self = this;
   axios.post('/logout', {id :this.state.userId})
   .then(res => {
     self.setState({
       userId : null,
       login_signup_view : true
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

 handleChatSelection(inputRoomId){
   this.setState({
     roomId : inputRoomId,
     chat_view : true
   })
 }

 handleChatExit(){
   var self = this;
   if (this.state.roomId) {
    axios.post('/exitChat', {id : this.state.userId})
    .then(res => {
      self.setState({
        chat_view : false,
        roomId : null
      })
    })
    .catch(err => {
      console.log(err);
    })
   }
 }

  render() {
    return (
      <div>
      <ViewNavBar logout={this.handleUserLogout} home={this.handleChatExit}/>
       {
         this.state.mounted ? 
         (this.state.login_signup_view ? 
         (<UserLoginSignup userSignupLogin={this.handleUserSignupLogin}/>) :
         (this.state.chat_view ? <Chatroom userId={this.state.userId} roomId={this.state.roomId}/> 
         : < ChatSelection selectRoom={this.handleChatSelection}/>))  
         :(<div>Loading Page</div>)
       }
      </div>
    )
  }
}

export default App
