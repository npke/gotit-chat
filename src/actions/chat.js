import User from '../firebase/user';
import Conversation from '../firebase/conversation';

const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const SELECT_USER = 'SELECT_USER';
const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';
const UPDATE_CONVERSATION_MESSAGES = 'UPDATE_CONVERSATION_MESSAGES';
const UPDATE_CONVERSATION_STATUS = 'UPDATE_CONVERSATION_STATUS';

const loadUsers = () => {
  return dispatch => {
    dispatch({ type: LOAD_USERS_REQUEST });
    
    return User.getUsers(users => dispatch({ type: LOAD_USERS_SUCCESS, users }));
  }
};

const initConversation = (user, partner) => {
  return dispatch => {
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
        partner.docRef.child('currentConversation').set(conversationRef.key);
        conversationRef.child('messages').push().set({ from: 'system', to: 'both', content: `Conversation was initialized by ${user.name}` });
      });
  }
};

const sendMessage = (conversation, message) => {
  return dispatch => {
    const newMessage = conversation.docRef.child('messages').push();
    newMessage.set(message);
  }
};

const updateConversationMessages = (messages) => ({
  type: UPDATE_CONVERSATION_MESSAGES,
  messages,
});

const closeConversation = (conversation, user) => {
  return dispatch => {
    conversation.docRef.child('messages').push().set({ from: 'system', to: 'both', content: `Conversation was closed by ${user.name}` });
    conversation.docRef.update({ status: 'ended' }); 
    conversation.partner.docRef.update({ status: 'available', currentConversation: null });
    user.docRef.update({ status: 'available', currentConversation: null });

    // Unsubscribe listener
    conversation.docRef.child('messages').off();
    conversation.docRef.child('status').off();

    return dispatch({ type: CLOSE_CONVERSATION });
  }
};

const updateConversationStatus = (status) => ({
  type: UPDATE_CONVERSATION_STATUS,
  status,
});

export default {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,

  SELECT_USER,
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION_MESSAGES,
  UPDATE_CONVERSATION_STATUS,
  
  loadUsers,
  initConversation,
  closeConversation,
  sendMessage,
  updateConversationMessages,
  updateConversationStatus,
};
