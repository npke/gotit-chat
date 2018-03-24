import Conversation from '../firebase/conversation';

const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';

const UPDATE_CONVERSATION_MESSAGES = 'UPDATE_CONVERSATION_MESSAGES';

const updateConversationMessages = (messages) => ({
  type: UPDATE_CONVERSATION_MESSAGES,
  messages,
});

const initConversation = (user, partner) => {
  return dispatch => {
    return Conversation.createConversation(user, partner)
      .then((conversationRef) => {
        dispatch({
          type: INIT_CONVERSATION,
          partner,
          docRef: conversationRef
        });

        return conversationRef.child('messages').on('value', (snapshot) => {
          const messages = [];
          snapshot.forEach((message) => {
            messages.push(message.val());
          });

          dispatch(updateConversationMessages(messages));
        });
      });
  }
};

const sendMessage = ({ from, to, message, docRef }) => {
  return dispatch => {
    const newMessage = docRef.child('messages').push();
    newMessage.set({ from, to, content: message });
  }
};

const closeConversation = () => ({
  type: CLOSE_CONVERSATION
});

export default {
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  UPDATE_CONVERSATION_MESSAGES,
  
  initConversation,
  closeConversation,
  sendMessage,
}
