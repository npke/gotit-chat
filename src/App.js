import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './containers/LoginForm';
import UserProfile from './containers/UserProfile';
import ChatBoard from './components/ChatBoard';

const App = ({ auth }) => {
  return auth.isLoggedIn ? auth.user.updatedInfo ? <ChatBoard /> : <UserProfile /> : <LoginForm />
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(App);
