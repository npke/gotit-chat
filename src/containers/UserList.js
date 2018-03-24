import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import User from '../components/User';
import Alert from '../components/Alert';
import UserActions from '../actions/user';
import "./UserList.css";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.props.onInit();
    this.state = {
      selectInvalidUser: false,
    }
  }

  selectUser = (user) => {
    if (user.status !== 'available') {
      return this.setState({
        selectInvalidUser: true,
      });
    }

    return this.props.onSelectUser(user);
  }

  render() {
    const { users, onSelectUser, isLoading } = this.props;
    return (
      <div>
        <ul className="user-list">
          {
            isLoading
            ? <Segment style={{ padding: '100px' }} basic loading></Segment>
            : users.map((user) => <User onSelect={this.selectUser} key={user.id} {...user} />)
          }
        </ul>

        {
          this.state.selectInvalidUser && <Alert onClose={() => this.setState({ selectInvalidUser: false })} title="User not available" message="This user is currently busy (yellow) or offline (red). Please select an available user (green)." />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users }) => ({
  users: users.data,//.filter(user => user.id !== auth.user.id),
  isLoading: users.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(UserActions.initUserList())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);