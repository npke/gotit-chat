const INIT_CONVERSATION = 'INIT_CONVERSATION';
const CLOSE_CONVERSATION = 'CLOSE_CONVERSATION';

const initConersation = (partner) => ({
  type: INIT_CONVERSATION,
  partner,
});

const closeConversation = () => ({
  type: CLOSE_CONVERSATION
});

export default {
  INIT_CONVERSATION,
  CLOSE_CONVERSATION,
  
  initConersation,
  closeConversation,
}
