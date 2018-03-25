import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import User from './User';
import "./UserList.css";

const UserList = ({ users, onSelectUser, isLoading }) => (
  <div>
    <ul className="user-list">
      {
        isLoading
        ? <Segment style={{ padding: '100px' }} basic loading></Segment>
        : users.map((user) => <User onSelect={onSelectUser} key={user.id} {...user} />)
      }
    </ul>
  </div>
);

export default UserList;
