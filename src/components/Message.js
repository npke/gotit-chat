import React from 'react';
import './Message.css';

const Message = ({ content, from }) => {
  const messageClassNames = ["message-container", from === "partner" ? "message-container-left" : from === "system" ? "system-message" : "message-container-right"];
  return (
    <div className={messageClassNames.join(" ")}>
      <div className="message-item">
        {content}
      </div>
    </div>
  )
}

export default Message;
