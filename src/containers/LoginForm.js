import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Grid, Header, Image, Icon, Message } from "semantic-ui-react";

import AuthActions from '../actions/auth';

const LoginForm = ({ onFacebookLogin, onGoogleLogin, error, isLogging }) => (
  <div className="login-form">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column verticalAlign="middle" style={{ maxWidth: 450 }}>

      <Image style={{ margin: 'auto' }} size="small" src="/assets/images/logo.png" />      
      <Header as="h2" color="violet" textAlign="center" style={{ marginBottom: '65px' }}>
      {" "}Enjoy every moment with your lovely friends
      </Header>

      {
        error && <Message color='red'>{error.message}</Message>
      }

      <Header as="h4">Login with</Header>

      <div>
        <Button disabled={isLogging} onClick={onFacebookLogin} fluid color='facebook' style={{ marginBottom: '10px'}}>
          <Icon name='facebook' />Facebook
        </Button>
        
        <Button disabled={isLogging} onClick={onGoogleLogin} fluid color='google plus'>
          <Icon name='google' />Google
        </Button>
      </div>

      </Grid.Column>
    </Grid>
  </div>
);

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  isLogging: auth.isLogging,
});

const mapDispatchToProps = (dispatch) => ({
  onFacebookLogin: () => dispatch(AuthActions.login('facebook')),
  onGoogleLogin: () => dispatch(AuthActions.login('google'))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
