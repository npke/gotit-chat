import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './containers/LoginForm';
import UserProfile from './containers/UserProfile';

const App = ({ auth }) => {
  return auth.isLoggedIn ? auth.user.updatedInfo ? <h1>Chatboard</h1> : <UserProfile /> : <LoginForm />
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(App);
