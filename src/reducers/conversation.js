import ConversationActions from '../actions/conversation';
import UserActions from '../actions/user';

export default (state = { partner: null, messages: []}, action) => {
  switch(action.type) {
    case UserActions.SELECT_USER:
      return {
        partner: action.user,
        messages: [],
      }
    case ConversationActions.INIT_CONVERSATION:
      return {
        partner: action.partner,
        docRef: action.docRef,
        messages: [],
      };
    case ConversationActions.CLOSE_CONVERSATION:
      return {
        partner: null,
        messages: []
      };
    case ConversationActions.UPDATE_CONVERSATION_MESSAGES:
      return Object.assign({}, state, { messages: action.messages });
    default: return state;
  }
}