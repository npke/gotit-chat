import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './containers/LoginForm';

const App = ({ auth }) => {
  return auth.isLoggedIn ? <h1>Chatboard</h1> : <LoginForm />
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(App);
