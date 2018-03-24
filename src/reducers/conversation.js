import ConversationActions from '../actions/conversation';

export default (state = { partner: null, messages: []}, action) => {
  switch(action.type) {
    case ConversationActions.INIT_CONVERSATION:
      return {
        partner: action.partner,
        messages: [],
      }
    default: return state;
  }
}