import ChatActions from '../actions/chat';

export default (state = { isLoading: true, data: []}, action) => {
  switch(action.type) {
    case ChatActions.LOAD_USERS_REQUEST:
      return Object.assign(state, { isLoading: true });
    case ChatActions.LOAD_USERS_SUCCESS:
      return { isLoading: false, data: action.users };
    default:
      return state;
  }
};