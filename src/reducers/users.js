import UserActions from '../actions/user';

export default (state = { isLoading: true, data: []}, action) => {
  switch(action.type) {
    case UserActions.LOAD_USERS_REQUEST:
      return Object.assign(state, { isLoading: true });
    case UserActions.LOAD_USERS_SUCCESS:
      return { isLoading: false, data: action.users };
    default:
      return state;
  }
};