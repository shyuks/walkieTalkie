import React from 'react';


var ChatLineItem = ({message, userClick}) => (
    <div>
      <b onClick={(e) => {userClick(message.user)}}>{message.from}</b> : {message.body}
    </div>
)


export default ChatLineItem