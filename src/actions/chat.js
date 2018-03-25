import User from '../firebase/user';
import Conversation from '../firebase/conversation';

const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const SELECT_USER = 'SELECT_USER';
const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';
const UPDATE_CONVERSATION_MESSAGES = 'UPDATE_CONVERSATION_MESSAGES';

const loadUsers = () => {
  return dispatch => {
    dispatch({ type: LOAD_USERS_REQUEST });
    
    return User.getUsers(users => dispatch({ type: LOAD_USERS_SUCCESS, users }));
  }
};

const selectUser = (user) => {
  return dispatch => {
    dispatch({ type: SELECT_USER, user });

    return user.docRef.update({ status: 'busy' })
      .then(() => dispatch(ConversationActions.initConversation(user)));
  }
};

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

const updateConversationMessages = (messages) => ({
  type: UPDATE_CONVERSATION_MESSAGES,
  messages,
});

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
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,

  SELECT_USER,
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION_MESSAGES,
  
  loadUsers,
  selectUser,
  initConversation,
  closeConversation,
  sendMessage,
  updateConversationMessages,
};
