import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CharBoard.css';
import UserInfo from '../components/UserInfo';
import UserList from '../components/UserList';
import Placeholder from '../components/Placeholder';
import Conversation from '../components/Conversation';
import Alert from '../components/Alert';

import AuthActions from '../actions/auth';
import ChatActions from '../actions/chat';

class ChatBoard extends Component {
  constructor(props) {
    super(props);

    this.props.onInit();
    this.state = {
      notification: null,
    };
  }

  selectUser = (user) => {
    const { conversation } = this.props;
    if (conversation.partner && conversation.status !== 'ended') {
      this.setState({
        notification: {
          title: 'Wait...',
          message: 'Please close the current conversation before starting a new one.'
        }
      });

      return;
    }

    const { onSelectUser } = this.props;

    if (user.status !== 'available') {
      this.setState({
        notification: {
          title: 'User is not available',
          message: 'This user is currently busy (yellow) or offline (red). Please select an available user (green).'
        }
      });

      return;
    }
    
    return onSelectUser(user);
  }

  hideNotification = () => {
    this.setState({
      notification: null
    });
  }

  render() {
    const {
      user,
      usersList,
      conversation,
      onLogout,
      onSendMessage,
      onCloseConversation
    } = this.props;
    const { users, isLoading } = usersList;
    const { partner, messages, status } = conversation;
    const { notification } = this.state;
    
    return (
      <div className="chat-board">
        <div className="left-pannel">
          <UserInfo {...user} onLogout={onLogout} />
    
          <UserList users={users} isLoading={isLoading} onSelectUser={this.selectUser} />
        </div>
    
        <div className="right-panel">
          {
            conversation.partner 
            ? <Conversation status={status} partner={partner} messages={messages} onSendMessage={onSendMessage} onCloseConversation={onCloseConversation}  />
            : <Placeholder />
          }
        </div>

        {notification && <Alert title={notification.title} message={notification.message} onClose={this.hideNotification} />}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users, conversation }) => ({
  user: auth.user,
  usersList: {
    users: users.data.filter(user => user.id !== auth.user.id),
    isLoading: users.isLoading,
  },
  conversation,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(ChatActions.loadUsers()),
  onLogout: () => dispatch(AuthActions.logout()),
  onSelectUser: user => dispatch(ChatActions.initConversation(user)),
  onSendMessage: message => dispatch(ChatActions.sendMessage(message)),
  onCloseConversation: () => dispatch(ChatActions.closeConversation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
