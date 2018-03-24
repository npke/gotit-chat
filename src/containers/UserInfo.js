import React from 'react';
import { connect } from 'react-redux';
import { Icon, Image } from 'semantic-ui-react';

import AuthActions from '../actions/auth';
import "./UserInfo.css";

const UserInfo = ({ name, email, profilePhotoUrl, onLogout }) => (
  <div>
    <div className="user-info">
      <Image className="user-profile-photo" src={profilePhotoUrl} />
      <div className="user-details">
        <h3 className="user-title">{name}</h3>
        <span className="user-email">{email}</span>
      </div>
      <Icon onClick={onLogout} size="large" name="log out"></Icon>
    </div>
  </div>
);

const mapStateToProps = ({ auth }) => auth.user;
const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(AuthActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);