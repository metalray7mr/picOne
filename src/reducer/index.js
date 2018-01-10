import {combineReducers} from 'redux';
import user from './user';
import status from './message-status';
import loginUser from './loginUser';
import loginStatus from './loginstatus';
import msg from './msg';
var rootReducer=combineReducers({
  user,
  status,
  loginUser,
  loginStatus,
  msg
});

export default rootReducer;
