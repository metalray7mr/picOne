import firebase from 'firebase';
var config = {
   apiKey: "AIzaSyAHlkFg4Y7G0uQZo5UJ-z1IiqIxmZbhYug",
   authDomain: "messanging-app-e0266.firebaseapp.com",
   databaseURL: "https://messanging-app-e0266.firebaseio.com",
   projectId: "messanging-app-e0266",
   storageBucket: "messanging-app-e0266.appspot.com",
   messagingSenderId: "646854606588"
 };
 firebase.initializeApp(config);

const db=firebase.database().ref('/user');

export function user(id) {
  return dispatch=>{
    db.child(id).once('value').then((snap)=>{

      dispatch({
        type:'USER_INFO',
        payload:{name:snap.val().name, src:snap.val().src}
      });
    })
    .catch((err)=>{
      dispatch({
        type:'USER_INFO',
        payload:null
      });
    });
  }
}
export function Get_Msg(id) {
  return dispatch=>{
    firebase.database().ref(`user/${id}/message`).orderByKey().on('value',(snap)=>{
  var a=[];
      snap.forEach((childSnapshot)=>{
  var childKey = childSnapshot.key;
  var childData = childSnapshot.val();
   a.push({msg:childData,time:childKey});

});

      dispatch({
        type:'GET_MSG',
        payload:a
      });
    });
  }
}
export function Post_Msg(id,msg,date,img) {
  return dispatch=>{
    firebase.database().ref(`user/${id}/message/${date}`).set({
      message:msg,
    }).then(()=>{
      dispatch({
        type:'MSG_SENT',
        payload:{msg:'your  message has been deliverd'}
      })
    });
  }
}

export function SignUp(email, password,username) {

  return dispatch=>{
    firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
      firebase.database().ref(`user/${username}`).update({
               name: username,
               uid: user.uid,
               message:'',
               date:user.metadata.creationTime,
               src:'https://www.adjust.com/new-assets/images/site-images/interface/user.svg',
               discription:''
     }
      );
      firebase.database().ref(`auth/${user.uid}`).update({
               name: username,
               uid: user.uid,
               date:user.metadata.creationTime,
               src:'https://www.adjust.com/new-assets/images/site-images/interface/user.svg',
               discription:''
     }
      );
      dispatch(Login(email,password));
    });
   }
}

export function Login(email,password,changeState,keepLogedIn){
  return dispatch=>{
 firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
   firebase.database().ref(`auth/${user.uid}`).once('value').then((snap)=>{
     localStorage.setItem('user', JSON.stringify(snap.val()));
     dispatch({
       type:'USER',
       payload:snap.val()
     });
     dispatch(Get_Msg(snap.val().name));
   });
 })
 .catch((err)=>{
   dispatch({
     type:'USERERROR',
     payload:err
   });
 });
}
}
export function Status(){
return dispatch=>{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    dispatch({
      type:'STATUS',
      payload:true
    });
  }
  else {
    dispatch({
      type:'STATUS',
      payload:false
    });
  }
});
}
}
export function SignOut() {
  return dispatch=>{
    firebase.auth().signOut().then(()=>{
      localStorage.clear();
      dispatch({
        type:'STATUS',
        payload:false
      });
       dispatch({
         type:'GET_MSG',
         payload: null
       });

    });
  }
}
