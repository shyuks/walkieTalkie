import React from 'react'

var ChatLineItem = ({message}) => (
  <div>
    <p><strong>{message.from}: </strong>{message.body}</p>
  </div>
);

export default ChatLineItem