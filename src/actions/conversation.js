const INIT_CONVERSATION = 'INIT_CONVERSATION';

const initConersation = (partner) => ({
  type: INIT_CONVERSATION,
  partner,
});

export default {
  INIT_CONVERSATION,
  
  initConersation,
}
