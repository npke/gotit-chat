import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import User from '../components/User';
import UserActions from '../actions/user';
import "./UserList.css";


class UserList extends Component {
  constructor(props) {
    super(props);

    this.props.onInit();
  }

  render() {
    const { users, onSelectUser, isLoading } = this.props;
    return (
      <ul className="user-list">
        {
          isLoading
          ? <Segment style={{ padding: '100px' }} basic loading></Segment>
          : users.map((user) => <User onSelect={() => onSelectUser(user)} key={user.id} {...user} />)
        }
      </ul>
    );
  }
}

const mapStateToProps = ({ auth, users }) => ({
  users: users.data.filter(user => user.id !== auth.user.id),
  isLoading: users.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(UserActions.initUserList()),
  onSelectUser: (user) => dispatch(UserActions.selectUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);