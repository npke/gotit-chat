import User from '../firebase/user';
import Conversation from '../firebase/conversation';
import ChatActions from '../actions/chat';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const onNewConversation = (dispatch, conversationId, userId) => {
  const conversationRef = Conversation.getConversation(conversationId);

  // Listen for conversation status
  conversationRef.child('status').on('value', (snapshot) => {
    const status = snapshot.val();

    if (status === 'ended') {
      dispatch(ChatActions.updateConversationStatus(status));
    }
  });

  // Get conversation info
  conversationRef.once('value', (snapshot) => {
    const conversation = snapshot.val();

    const partnerRef = userId === conversation.init 
      ? User.getUser(conversation.partner)
      : User.getUser(conversation.init);

    // Get partner info
    partnerRef.once('value', (partnerData) => {
      const partner = partnerData.val();
      partner.docRef = partnerData.ref;

      dispatch({
        type: ChatActions.INIT_CONVERSATION,
        partner,
        docRef: conversationRef
      });

      conversationRef.child('messages').on('child_added', (message) => {
        const newMessage = message.val();

        dispatch(ChatActions.receiveNewMessage(newMessage));
      });
    });
  }); 
}

const login = (provider) => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return User.login(provider)
      .then(user => {
        user.docRef.update({ status: 'available', currentConversation: null });

        // Listen for new conversation
        user.docRef.on('value', (snapshot) => {
          const data  = snapshot.val();

          if (data.currentConversation) {
            onNewConversation(dispatch, data.currentConversation, user.id);
          }
        });

        return dispatch(loginSuccess(user));
      })
      .catch(error => dispatch(loginFailure(error)));
  };
};

const logout = (userRef) => {
  return dispatch => {
    dispatch({ type: LOGOUT });

    userRef.off();
    return userRef.update({ status: 'offline' });
  }
};

const updateProfileSuccess = (updatedProfile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  updatedProfile,
});

const updateProfile = (userRef, profile) => {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    return userRef.update(profile)
      .then(() => dispatch(updateProfileSuccess(profile)));
  }
};

const actions = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  
  login,
  loginSuccess,
  loginFailure,
  logout,

  updateProfile,
  updateProfileSuccess,
};

export default actions;
