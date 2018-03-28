import User from '../firebase/user';
import Conversation from '../firebase/conversation';

const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const SELECT_USER = 'SELECT_USER';
const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';
const UPDATE_CONVERSATION_STATUS = 'UPDATE_CONVERSATION_STATUS';
const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE';

const loadUsers = () => {
  return dispatch => {
    dispatch({ type: LOAD_USERS_REQUEST });
    
    return User.getUsers(users => dispatch({ type: LOAD_USERS_SUCCESS, users }));
  }
};

const initConversation = (partner) => {
  return (dispatch, getState) => {
    // Get current authenticated user
    const { user } = getState().auth;

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

const sendMessage = (message) => {
  return (dispatch, getState) => {
    const { auth, conversation } = getState();
    const messagePayload = {
      content: message,
      from: auth.user.id,
      to: conversation.partner.id
    };

    const newMessage = conversation.docRef.child('messages').push();
    newMessage.set(messagePayload);
  }
};

const closeConversation = () => {
  return (dispatch, getState) => {
    const { auth, conversation } = getState();
    const { user } = auth;

    // Unsubscribe listener
    conversation.docRef.child('messages').off();
    conversation.docRef.child('status').off();

    // Conversation was closed & updated by partner user 
    if (conversation.status === 'ended') {
      return dispatch({ type: CLOSE_CONVERSATION });
    }

    // Send notification message and update conversation's status, user's status
    conversation.docRef.child('messages').push().set({ from: 'system', to: 'both', content: `Conversation was closed by ${user.name}` });
    conversation.docRef.update({ status: 'ended' }); 
    conversation.partner.docRef.update({ status: 'available', currentConversation: null });
    user.docRef.update({ status: 'available', currentConversation: null });

    return dispatch({ type: CLOSE_CONVERSATION });
  }
};

const updateConversationStatus = (status) => ({
  type: UPDATE_CONVERSATION_STATUS,
  status,
});

const receiveNewMessage = (message) => ({
  type: RECEIVE_NEW_MESSAGE,
  message,
});

export default {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,

  SELECT_USER,
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION_STATUS,
  RECEIVE_NEW_MESSAGE,
  
  loadUsers,
  initConversation,
  closeConversation,
  sendMessage,
  updateConversationStatus,
  receiveNewMessage,
};
