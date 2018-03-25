import Conversation from '../firebase/conversation';
import User from '../firebase/user';

const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';
const SELECT_USER = 'SELECT_USER';

const UPDATE_CONVERSATION_MESSAGES = 'UPDATE_CONVERSATION_MESSAGES';

const updateConversationMessages = (messages) => ({
  type: UPDATE_CONVERSATION_MESSAGES,
  messages,
});

const initConversation = (user, partner) => {
  return dispatch => {
    dispatch({ type: SELECT_USER, user });

    user.docRef.update({ status: 'busy' });
    partner.docRef.update({ status: 'busy' });
    return Conversation.createConversation(user, partner)
      .then((conversationRef) => {
        dispatch({
          type: INIT_CONVERSATION,
          partner,
          docRef: conversationRef
        });

        user.docRef.child('currentConversation').set(conversationRef.key);
        conversationRef.child('messages').push().set({ from: 'system', to: 'both', content: `Conversation was initialized by ${user.name}` });
      });
  }
};

const sendMessage = ({ from, to, message, docRef }) => {
  return dispatch => {
    const newMessage = docRef.child('messages').push();
    newMessage.set({ from, to, content: message });
  }
};

const closeConversation = (data) => {
  return dispatch => {
    data.conversationRef.child('messages').push().set({ from: 'system', to: 'both', content: `Conversation was closed by ${data.user.name}` });
    data.conversationRef.update({ status: 'ended '}); 
    User.getUser(data.user.id).update({ status: 'available', currentConversation: null });
    User.getUser(data.partner.id).update({ status: 'available', currentConversation: null });

    // Unsubscribe listener
    data.conversationRef.child('messages').off();

    return dispatch({ type: CLOSE_CONVERSATION });
  }
};

export default {
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION_MESSAGES,
  
  initConversation,
  closeConversation,
  sendMessage,
  updateConversationMessages,
}
