import React from 'react';
import { connect } from 'react-redux';

import './CharBoard.css';
import UserInfo from '../containers/UserInfo';
import UserList from '../containers/UserList';
import Placeholder from './Placeholder';
import Conversation from '../containers/Conversation';

const ChatBoard = ({ inConversation }) => (
  <div className="chat-board">
    <div className="left-pannel">
      <UserInfo />

      <UserList />
    </div>

    <div className="right-panel">
      {
        inConversation ? <Conversation /> : <Placeholder />
      }
    </div>
  </div>
);

const mapStateToProps = ({ conversation }) => ({
  inConversation: !!conversation.partner
});

export default connect(mapStateToProps, null)(ChatBoard);
