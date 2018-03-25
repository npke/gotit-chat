import React from 'react';
import { Icon } from 'semantic-ui-react';
import './Placeholder.css';

const Placeholer = () => (
  <div className="conversation-placeholder">
    <Icon size="massive" color="violet" name="comments outline"></Icon>
    <h2>Select a friend to start chatting!!!</h2>
  </div>
);

export default Placeholer;
