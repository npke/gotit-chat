import React from 'react';
import { connect } from 'react-redux';

import './CharBoard.css';
import UserInfo from '../containers/UserInfo';
import UserList from '../containers/UserList';
import Placeholder from './Placeholder';
import Conversation from '../containers/Conversation';

import ConversationActions from '../actions/conversation';

const ChatBoard = ({ inConversation, createConversation, user }) => (
  <div className="chat-board">
    <div className="left-pannel">
      <UserInfo />

      <UserList onSelectUser={partner => createConversation(user, partner)} />
    </div>

    <div className="right-panel">
      {
        inConversation ? <Conversation /> : <Placeholder />
      }
    </div>
  </div>
);

const mapStateToProps = ({ auth, conversation }) => ({
  inConversation: !!conversation.partner,
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  createConversation: (user, partner) => dispatch(ConversationActions.initConversation(user, partner)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
