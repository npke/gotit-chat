import User from '../firebase/user';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const login = (provider) => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return User.login(provider)
      .then(user => dispatch(loginSuccess(user)))
      .catch(error => dispatch(loginFailure(error)));
  };
};

const logout = (userRef) => {
  return dispatch => {
    dispatch({ type: LOGOUT });

    return userRef.update({ status: 'offline' });
  }
};

const updateProfileSuccess = (updatedProfile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  updatedProfile,
});

const updateProfile = (userRef, profile) => {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    return userRef.update(profile)
      .then(() => dispatch(updateProfileSuccess(profile)));
  }
};

const actions = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  
  login,
  loginSuccess,
  loginFailure,
  logout,

  updateProfile,
  updateProfileSuccess,
};

export default actions;
