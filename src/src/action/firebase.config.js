import firebase from 'firebase';

// Initialize Firebase
 const config = {
  apiKey: "AIzaSyDv7aW7G8VMogYbHqzzfkLjUzshFpvGMCc",
  authDomain: "piconechat.firebaseapp.com",
  databaseURL: "https://piconechat.firebaseio.com",
  projectId: "piconechat",
  storageBucket: "piconechat.appspot.com",
  messagingSenderId: "386595132301"
};
firebase.initializeApp(config);
export default config;
