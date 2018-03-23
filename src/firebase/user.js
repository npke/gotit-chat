import Moment from 'moment';
import Firebase from 'firebase';
import { Auth, Database } from './index';

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
    });
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
    });
};

const login = (provider) => {
  switch(provider) {
    case 'facebook': return loginWithFacebook();
    case 'google': return loginWithGoogle();
    default: throw new Error(`${provider} is not supported`);
  }
}

export default {
  login,
}