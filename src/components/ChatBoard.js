import React from 'react';

import './CharBoard.css';
import UserInfo from '../containers/UserInfo';
import UserList from '../containers/UserList';

const ChatBoard = () => (
  <div className="chat-board">
    <div className="left-pannel">
      <UserInfo />

      <UserList />
    </div>

    <div className="right-panel">
      <h1>Conversation</h1>
    </div>
  </div>
);


export default ChatBoard;
