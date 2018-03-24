import React from 'react';

import './CharBoard.css';
import UserInfo from '../containers/UserInfo';

const ChatBoard = () => (
  <div className="chat-board">
    <div className="left-pannel">
      <UserInfo />

      <h1>UserList</h1>
    </div>

    <div className="right-panel">
      <h1>Conversation</h1>
    </div>
  </div>
);


export default ChatBoard;
