import ConversationActions from '../actions/conversation';

export default (state = { partner: null, messages: []}, action) => {
  switch(action.type) {
    case ConversationActions.INIT_CONVERSATION:
      return {
        partner: action.partner,
        messages: [],
      };
    case ConversationActions.CLOSE_CONVERSATION:
      return {
        partner: null,
        messages: []
      }
    default: return state;
  }
}