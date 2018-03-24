import User from '../firebase/user';
import Conversation from '../firebase/conversation';
import ConversationActions from '../actions/conversation';

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

const login = (provider) => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return User.login(provider)
      .then(user => {
        user.docRef.update({ status: 'available', currentConversation: null });

        user.docRef.on('value', (snapshot) => {
          const data  = snapshot.val();

          if (data.currentConversation) {
            const conversation = Conversation.getConversation(data.currentConversation);
            conversation.once('value', (snapshot) => {
              const data = snapshot.val();

              const getPartner = user.id === data.init ? User.getUser(data.partner) : User.getUser(data.init);

              getPartner.once('value', (partnerData) => {
                const partner = partnerData.val();

                dispatch({
                  type: ConversationActions.INIT_CONVERSATION,
                  partner,
                  docRef: conversation
                });
              });
            });

            return conversation.child('messages').on('value', (snapshot) => {
              const messages = [];
              snapshot.forEach((message) => {
                messages.push(message.val());
              });
    
              dispatch(ConversationActions.updateConversationMessages(messages));
            });
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
