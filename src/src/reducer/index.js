import {combineReducers} from 'redux';
import LoginStatus from './loginstatus';
import UserInfo from './userInfo';
import SignUp from './signUp';
import ValidUser from './validUser';
import LogIn from './logIn';
import ReqList from './reqList';
import ChatList from './chatList';
import ChatListItem from './chatListItem';
import ChatSingle from './chatSingle';
import Owner from './owner';

var rootReducer=combineReducers({
  LoginStatus,
  UserInfo,
  SignUp,
  ValidUser,
  LogIn,
  ReqList,
  ChatList,
  ChatListItem,
  ChatSingle,
  Owner
});
export default rootReducer;
