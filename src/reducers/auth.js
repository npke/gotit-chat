import { combineReducer } from 'redux';
import actions from '../actions/auth';

export default (state = { isLoggedIn: false, isLogging: false, user: null, error: null }, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        isLoggedIn: false,
        isLogging: true,
        user: null,
        error: null,
      };
    case actions.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLogging: false,
        error: null,
        user: action.user
      };
    case actions.LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        isLogging: false,
        user: null,
        error: action.error
      };
    default: 
      return state;
  }
};
