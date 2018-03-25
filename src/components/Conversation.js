import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import "./Conversation.css";
import Message from './Message';

class Conversation extends Component {

  scrollToBottom () {
    const messageContainer = document.getElementById('conversation-body');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      const message = this.message.value;
      
      if (!message) return;

      this.message.value = '';
      return onSendMessage({
        to: partner.id,
        message,
      });
    }
  }

  render() {
    const { partner, messages, onCloseConversation } = this.props;
    return (
      <div className="conversation"> 
        <div>
          <div className="conversation-header">
            <div className="partner-info">
              <img className="user-profile-photo" src={partner.profilePhotoUrl} />
              <h3 className="user-title">{partner.name}</h3>
            </div>
            <Icon onClick={onCloseConversation} size="large" name="close" />
          </div>
        </div>
    
        <div id="conversation-body">
          {
            messages.map((message, index) => <Message
              key={index} content={message.content}
              from={message.from === 'system' ? 'system' : message.from === partner.id ? 'partner' : 'user'} 
            />)
          }
        </div>
    
        <div className="message-input-container">
          <input onKeyUp={this.onKeyUp} ref={input => this.message = input} className="message-input" type="text" />
        </div>
      </div>
    );
  }
};

export default Conversation;
