import firebase from 'firebase';
import config from './firebase.config';

export function signUp(userName, userPassword, userEmail) {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        firebase
          .database()
          .ref(`user/${userName}`)
          .update({
            public: {
              userID: userName,
              src:
                'https://www.adjust.com/new-assets/images/site-images/interface/user.svg',
              discription: 'hey there i am using picOne',
              lastSeen: new Date()
            },
            private: {
              date: user.metadata.creationTime,
              uid: user.uid
            }
          });
        firebase
          .database()
          .ref(`auth/${user.uid}`)
          .update({
            userID: userName,
            uid: user.uid
          });
        dispatch(login(userEmail, userPassword));
      })
      .catch(err => {
        dispatch({
          type: 'SIGNUP_ERROR',
          payload: err
        });
      });
  };
}

export function login(email, password) {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .database()
          .ref(`auth/${user.uid}`)
          .once('value')
          .then(snap => {
            firebase
              .database()
              .ref(`user/${snap.val().userID}`)
              .once('value')
              .then(snap => {
                localStorage.setItem('user', JSON.stringify(snap.val()));
                dispatch({
                  type: 'USER_INFO',
                  payload: snap.val()
                });
              });
          });
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: err
        });
      });
  };
}
export function loginStatus() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: true
        });
      } else {
        dispatch({
          type: 'LOGIN_STATUS',
          payload: false
        });
      }
    });
  };
}

export function signOut(user) {
  return dispatch => {
    firebase
      .database()
      .ref(`user/${user}/public`)
      .update({
        lastSeen: new Date()
      });
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: 'STATUS',
          payload: false
        });
        dispatch({
          type: 'GET_MSG',
          payload: null
        });
        console.log('here');
        dispatch({
          type: 'CHAT_LIST',
          payload: null
        });
        dispatch({
          type: 'CHAT_SINGLE',
          payload: null
        });
      });
    localStorage.clear();
  };
}
