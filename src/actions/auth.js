import User from '../firebase/user';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

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

const logout = () => ({
  type: LOGOUT
});

const actions = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  
  login,
  loginSuccess,
  loginFailure,
  logout
};

export default actions;
