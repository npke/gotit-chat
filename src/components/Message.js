import React from 'react';
import './Message.css';

const Message = ({ content, fromPartner }) => {
  const messageClassNames = ["message-container", fromPartner ? "message-container-left" : "message-container-right"];
  return (
    <div className={messageClassNames.join(" ")}>
      <div className="message-item">
        {content}
      </div>
    </div>
  )
}

export default Message;
