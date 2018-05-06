import firebase from 'firebase';
import config from './firebase.config';

export function validUser(ID) {
  return dispatch => {
    dispatch({
      type: 'VALID_USER',
      payload: 'err'
    });
    firebase
      .database()
      .ref(`user/${ID}/public`)
      .once('value')
      .then(snap => {
        dispatch({
          type: 'VALID_USER',
          payload: snap.val()
        });
      })
      .catch(() => {
        dispatch({
          type: 'VALID_USER',
          payload: false
        });
      });
  };
}

export function updateProfile(image, discription, uuidv4) {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  if (!image) {
    return dispatch => {
      firebase
        .database()
        .ref(`user/${userID}/public`)
        .update({
          discription: discription
        });
    };
  } else {
    var task = firebase
      .storage()
      .ref(`/images/${uuidv4}`)
      .put(image);
    return dispatch => {
      task.on(
        'state_changed',
        progress => {
          var percentage =
            progress.bytesTransferred / progress.totalBytes * 100;
          dispatch({
            type: 'UPLOAD_PROGRESS',
            payload: percentage
          });
          console.log(percentage);
        },
        err => {
          dispatch({
            type: 'UPLOAD_ERROR',
            payload: err
          });
        },
        () => {
          task.then(snap => {
            firebase
              .database()
              .ref(`user/${userID}/public`)
              .update({
                discription: discription,
                src: snap.downloadURL
              })
              .then(() => {
                dispatch({
                  type: 'PROFILE_UPDATE',
                  payload: 'CREATED SUCCESSFULLY'
                });
              });
            dispatch(userUpdate());
          });
        }
      );
    };
  }
}
export function userUpdate() {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  return dispatch => {
    firebase
      .database()
      .ref(`user/${userID}`)
      .once('value')
      .then(snap => {
        localStorage.setItem('user', JSON.stringify(snap.val()));
        dispatch({
          type: 'USER_INFO',
          payload: snap.val()
        });
      });
  };
}

export function makeRequest(ID, requestID, requestMessage, image) {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  if (!image) {
    return dispatch => {
      firebase
        .database()
        .ref(`user/${userID}/chat/${requestID}`)
        .update({
          chatID: requestID
        });
      firebase
        .database()
        .ref(`user/${ID}/req/${requestID}`)
        .update({
          chatID: requestID,
          message: requestMessage,
          src: false,
          timeStamp: Date.now()
        });
      dispatch({
        type: 'VALID_USER',
        payload: 'SUCCESSFULL'
      });
    };
  } else {
    var task = firebase
      .storage()
      .ref(`/images/${requestID}`)
      .put(image);
    return dispatch => {
      task.on(
        'state_changed',
        progress => {
          var percentage =
            progress.bytesTransferred / progress.totalBytes * 100;
          dispatch({
            type: 'UPLOAD_PROGRESS',
            payload: percentage
          });
          console.log(percentage);
        },
        err => {
          dispatch({
            type: 'UPLOAD_ERROR',
            payload: err
          });
        },
        () => {
          task.then(snap => {
            firebase
              .database()
              .ref(`user/${userID}/sent/${requestID}`)
              .update({
                chatID: requestID,
                timeStamp: Date.now(),
                profile: 'unknown'
              });
            firebase
              .database()
              .ref(`user/${ID}/req/${requestID}`)
              .update({
                chatID: requestID,
                message: requestMessage,
                src: snap.downloadURL,
                timeStamp: Date.now()
              })
              .then(() => {
                dispatch({
                  type: 'VALID_USER',
                  payload: 'SUCCESSFULL'
                });
              });
          });
        }
      );
    };
  }
}
export function getRequest() {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  return dispatch => {
    firebase
      .database()
      .ref(`user/${userID}/req`)
      .orderByChild('timestamp')
      .on('value', snap => {
        var a = [];
        snap.forEach(childSnapshot => {
          a.push(childSnapshot.val());
        });
        if (a.length === 0) {
          dispatch({
            type: 'REQ_LIST',
            payload: null
          });
        } else {
          dispatch({
            type: 'REQ_LIST',
            payload: a
          });
        }
      });
  };
}
export function acceptRequest(data, hide) {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  var date = Date.now();
  return dispatch => {
    firebase
      .database()
      .ref(`chat/${data.chatID}`)
      .update({
        state: {
          chatID: data.chatID,
          discription: data.message,
          timeStamp: Date.now(),
          owner: {
            me: userID,
            you: false
          }
        }
      });
    firebase
      .database()
      .ref(`chat/${data.chatID}/message/${date}`)
      .update({
        timeStamp: Date.now(),
        sender: 'unKnown',
        message: 'hii'
      });
    firebase
      .database()
      .ref(`user/${userID}/chat/${data.chatID}`)
      .update({
        chatID: data.chatID,
        timeStamp: Date.now(),
        profile: userID
      });
    dispatch(getChat());
    firebase
      .database()
      .ref(`user/${userID}/req/${data.chatID}`)
      .remove()
      .then(() => {
        hide(data.chatID);
      });
    console.log(data.chatID, hide);
  };
}
export function rejectRequest(data) {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  return dispatch => {
    firebase
      .database()
      .ref(`user/${userID}/rejected/${data.chatID}`)
      .update({
        chatID: data.chatID,
        timeStamp: Date.now()
      });
    firebase
      .database()
      .ref(`user/${userID}/req/${data.chatID}`)
      .remove();
  };
}
export function getChat() {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  return dispatch => {
    dispatch({
      type: 'CHAT_LIST',
      payload: null
    });
    firebase
      .database()
      .ref(`user/${userID}/chat`)
      .orderByChild('timeStamp')
      .once('value', snap => {
        snap.forEach(childSnapshot => {
          firebase
            .database()
            .ref(`chat/${childSnapshot.val().chatID}/state`)
            .orderByChild('timeStamp')
            .on('value', snap2 => {
              if (snap2.val()) {
                dispatch({
                  type: 'CHAT_LIST',
                  payload: snap2.val()
                });
              }
            });
        });
      })
      .catch(() => {
        dispatch({
          type: 'CHAT_LIST',
          payload: false
        });
      });
  };
}
export function getChatSingle(chatID) {
  return dispatch => {
    firebase
      .database()
      .ref(`chat/${chatID}/message`)
      .orderByChild('timeStamp')
      .on('value', snap => {
        var a = [];
        snap.forEach(childSnapshot => {
          a.push(childSnapshot.val());
        });
        if (a.length === 0) {
          dispatch({
            type: 'CHAT_SINGLE',
            payload: null
          });
        } else {
          dispatch({
            type: 'CHAT_SINGLE',
            payload: a.reverse()
          });
        }
      });
  };
}
export function owner(ownerID) {
  var user = JSON.parse(localStorage.getItem('user'));
  const userID = user.public.userID;
  return dispatch => {
    if (userID === ownerID) {
      dispatch({
        type: 'OWNER',
        payload: [userID, '']
      });
    } else {
      dispatch({
        type: 'OWNER',
        payload: ['unKnown', ownerID]
      });
    }
  };
}
export function putMessage(text, chatID, owner) {
  var date = new Date();
  return dispatch => {
    firebase
      .database()
      .ref(`chat/${chatID}/message/${date}`)
      .update({
        timeStamp: Date.now(),
        sender: owner[0],
        message: text
      });
    firebase
      .database()
      .ref(`chat/${chatID}/state`)
      .update({ timeStamp: Date.now() });
  };
}
