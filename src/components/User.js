import React from 'react';
import Moment from 'moment';

import './User.css';

const statusColors = {
  available: '#21ba45',
  offline: '#db2828',
  busy: '#fbbd08',
}

const getUserMetaInfo = (gender, birthday) => {
  const now = Moment().year();
  const yearOfUserBirthday = Moment(birthday, 'DD/MM/YYYY').year();

  return `${gender} - ${now - yearOfUserBirthday}`;
};

const User = (user) => {
  const { id, name, status, profilePhotoUrl, gender, birthday, onSelect } = user;
  return (
    <li onClick={() => onSelect(user)} className="user-item">
      <img className="user-profile-photo" src={profilePhotoUrl} />
      <div className="user-item-details">
        <p className="user-item-name">{name}</p> 
        <p className="user-item-meta">{getUserMetaInfo(gender, birthday)}</p>
      </div>
      <div className="status-indicator" style={{ backgroundColor: statusColors[status] }}></div>
    </li>
  );
}

export default User;