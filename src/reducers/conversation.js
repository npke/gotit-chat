import ChatActions from '../actions/chat';

export default (state = { partner: null, messages: []}, action) => {
  switch(action.type) {
    case ChatActions.INIT_CONVERSATION:
      return {
        status: 'started',
        partner: action.partner,
        docRef: action.docRef,
        messages: [],
      };
    case ChatActions.CLOSE_CONVERSATION:
      return {
        status: 'ended',
        partner: null,
        messages: []
      };
    case ChatActions.UPDATE_CONVERSATION_MESSAGES:
      return Object.assign({}, state, { messages: action.messages });
    case ChatActions.UPDATE_CONVERSATION_STATUS:
      return Object.assign({}, state, { status: action.status });
    default: return state;
  }
}