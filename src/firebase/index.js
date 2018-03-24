import Firebase from 'firebase';
import Firestore from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyANfreqbZObQPOk9FNuYhUBYNp-sZtx-DE",
  authDomain: "gotit-chat.firebaseapp.com",
  databaseURL: "https://gotit-chat.firebaseio.com",
  projectId: "gotit-chat",
  storageBucket: "gotit-chat.appspot.com",
  messagingSenderId: "263582348688"
};

const App = Firebase.initializeApp(config);
const Auth = App.auth();
const Database = App.database();

export { App, Auth, Database };
