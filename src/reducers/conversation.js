import ChatActions from '../actions/chat';

export default (state = { partner: null, messages: []}, action) => {
  switch(action.type) {
    case ChatActions.SELECT_USER:
      return {
        partner: action.user,
        messages: [],
      }
    case ChatActions.INIT_CONVERSATION:
      return {
        partner: action.partner,
        docRef: action.docRef,
        messages: [],
      };
    case ChatActions.CLOSE_CONVERSATION:
      return {
        partner: null,
        messages: []
      };
    case ChatActions.UPDATE_CONVERSATION_MESSAGES:
      return Object.assign({}, state, { messages: action.messages });
    default: return state;
  }
}