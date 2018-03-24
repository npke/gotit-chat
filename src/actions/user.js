import User from '../firebase/user';

const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const SELECT_USER = 'SELECT_USER';

const initUserList = () => {
  return dispatch => {
    dispatch({ type: LOAD_USERS_REQUEST });
    
    return User.getUsers(users => dispatch({ type: LOAD_USERS_SUCCESS, users }));
  }
};

const selectUser = (user) => {
  return dispatch => {
    dispatch({ type: CHAT_SELECT_USER, user });

    return user.docRef.update({ status: 'busy' })
      .then(() => dispatch())
  }
};

export default {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  SELECT_USER,
  
  initUserList
};
