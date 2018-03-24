import { Database } from './index';

export default {
  createConversation(user, partner) {
    const newConversation = Database.ref('conversations').push();
    newConversation.set({
      init: user.id,
      partner: partner.id,
    });

    partner.docRef.child('currentConversation').set(newConversation.key);
    
    return newConversation;
  },

  getConversation(key) {
    return Database.ref('conversations').child(key);
  }
}