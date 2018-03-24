import React from 'react';
import './Message.css';

const formatMessage = (message) => {
  return message.replace(/(https?:\/\/[^\s]+)/gi, "<a target='_blank' href='$1'>$1</a>");
}

const Message = ({ content, from }) => {
  const messageClassNames = ["message-container", from === "partner" ? "message-container-left" : from === "system" ? "system-message" : "message-container-right"];
  return (
    <div className={messageClassNames.join(" ")}>
      <div className="message-item">
       <span dangerouslySetInnerHTML={{__html: formatMessage(content)}} />
      </div>
    </div>
  )
}

export default Message;
