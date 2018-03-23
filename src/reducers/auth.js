import { combineReducer } from 'redux';
import actions from '../actions/auth';

export default (state = {
  isLoggedIn: false,
  isLogging: false,
  isUpdatingProfile: false,
  user: null,
  error: null
}, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        isLoggedIn: false,
        isLogging: true,
        isUpdatingProfile: false,
        user: null,
        error: null,
      };
    case actions.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLogging: false,
        isUpdatingProfile: false,
        error: null,
        user: action.user
      };
    case actions.LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        isLogging: false,
        isUpdatingProfile: false,
        user: null,
        error: action.error
      };
    case actions.UPDATE_PROFILE_REQUEST:
      return Object.assign({}, state, { isUpdatingProfile: true });
    case actions.UPDATE_PROFILE_SUCCESS: 
      return Object.assign({}, state, { user: action.updatedProfile });
    default:
      return state;
  }
};
