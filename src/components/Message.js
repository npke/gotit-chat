import React from 'react';
import './Message.css';

const formatMessage = (message) => {
  return message.replace(/(https?:\/\/[^\s]+)/gi, "<a target='_blank' href='$1'>$1</a>")
    .replace(/:\)/gi, '\u{1F642}')
    .replace(/:D/gi, '\u{1F603}')	
    .replace(/:p/gi, '\u{1F60B}')	
    .replace(/:'\)/gi, '\u{1F602}')	
    .replace(/:-\*/gi, '\u{1F618}')	
    .replace(/:\(/gi, '\u{1F61E}')	
    .replace(/:'\(/gi, '\u{1F622}');
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
