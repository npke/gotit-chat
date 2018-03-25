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

  logout = () => {
    const { user, onLogout } = this.props;
    return onLogout(user);
  }

  selectUser = (partner) => {
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

    const { user, onSelectUser } = this.props;

    if (partner.status !== 'available') {
      this.setState({
        notification: {
          title: 'User is not available',
          message: 'This user is currently busy (yellow) or offline (red). Please select an available user (green).'
        }
      });

      return;
    }
    
    return onSelectUser(user, partner);
  }

  hideNotification = () => {
    this.setState({
      notification: null
    });
  }

  sendMessage = (content) => {
    const { conversation, user, onSendMessage } = this.props;
    const message = {
      content,
      from: user.id,
      to: conversation.partner.id
    };

    return onSendMessage(conversation, message);
  }

  closeConversation = () => {
    const { conversation, user } = this.props;

    return this.props.onCloseConversation(conversation, user);
  }

  render() {
    const { user, usersList, conversation } = this.props;
    const { users, isLoading } = usersList;
    const { partner, messages, status } = conversation;
    const { notification } = this.state;
    
    return (
      <div className="chat-board">
        <div className="left-pannel">
          <UserInfo {...user} onLogout={this.logout} />
    
          <UserList users={users} isLoading={isLoading} onSelectUser={this.selectUser} />
        </div>
    
        <div className="right-panel">
          {
            conversation.partner 
            ? <Conversation status={status} partner={partner} messages={messages} onSendMessage={this.sendMessage} onCloseConversation={this.closeConversation}  />
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
  onLogout: (user) => dispatch(AuthActions.logout(user.docRef)),
  onSelectUser: (user, partner) => dispatch(ChatActions.initConversation(user, partner)),
  onSendMessage: (conversation, message) => dispatch(ChatActions.sendMessage(conversation, message)),
  onCloseConversation: (conversation, user) => dispatch(ChatActions.closeConversation(conversation, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
