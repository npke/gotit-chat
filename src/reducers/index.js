import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import conversation from './conversation';

const rootReducer = combineReducers({
  auth,
  users,
  conversation
});

export default rootReducer;
