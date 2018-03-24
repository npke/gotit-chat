import Moment from 'moment';
import Firebase from 'firebase';
import { Auth, Database } from './index';

// Find or create user in the database
const findOrCreateUser = (userData) => {
  const usersRef = Database.collection('users');

  return usersRef.where('email', '==', userData.email).get()
    .then((snapshot) => {
      if (!snapshot.size) {
        const newUser = Object.assign(userData, { updatedInfo: false });
        
        return usersRef.add(newUser)
          .then((docRef) => Object.assign({ docRef }, newUser))
      }

      const user = snapshot.docs[0];
      return Object.assign({}, user.data(), { docRef: user.ref });
    });
};

const loginWithFacebook = () => {
  const provider = new Firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');

  return Auth.signInWithPopup(provider)
    .then((result) => {
      const { profile } = result.additionalUserInfo;

      return {
        id: result.user.uid,
        provider: 'facebook',
        isNewUser: result.additionalUserInfo.isNewUser,
        email: profile.email,
        name: profile.name || null,
        gender: profile.gender || null,
        birthday: Moment(profile.birthday, 'MM/DD/YYYY').format('DD/MM/YYYY'),
        profilePhotoUrl: `https://graph.facebook.com/${profile.id}/picture?width=300&height=300`,
      };
    })
    .then((userData) => findOrCreateUser(userData));  
};

const loginWithGoogle = () => {
  const provider = new Firebase.auth.GoogleAuthProvider();
  provider.addScope('email');

  return Auth.signInWithPopup(provider)
    .then((result) => {
      const { profile } = result.additionalUserInfo;

      return {
        id: result.user.uid,
        provider: 'google',
        isNewUser: result.additionalUserInfo.isNewUser,
        email: profile.email,
        name: profile.name,
        gender: profile.gender || null,
        birthday: profile.birthday || null,
        profilePhotoUrl: profile.picture,
      };
    })
    .then((userData) => findOrCreateUser(userData));    
};

const login = (provider) => {
  switch(provider) {
    case 'facebook': return loginWithFacebook();
    case 'google': return loginWithGoogle();
    default: throw new Error(`${provider} is not supported`);
  }
};

const getUsers = (callback) => {
  return Database.collection('users')
    .onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => Object.assign(doc.data(), { docRef: doc.ref }));

      return callback(users);
    });
};

export default {
  login,
  getUsers,
}