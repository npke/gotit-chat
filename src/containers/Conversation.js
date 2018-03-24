import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import "./Conversation.css";
import ConversationActions from '../actions/conversation';
import Message from '../components/Message';

const Conversation = ({ partner, messages, onCloseConversation }) => (
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

    <div className="conversation-body">
      {
        messages.map(message => <Message content={message.content} fromPartner={message.from === partner.id} />)
      }
    </div>

    <div className="message-input-container">
      <input className="message-input" type="text" />
    </div>
  </div>
);

const mapStateToProps = ({ conversation }) => ({
  partner: conversation.partner,
  messages: conversation.messages
});

const mapDispatchToProps = (dispatch) => ({
  onCloseConversation: () => dispatch(ConversationActions.closeConversation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
