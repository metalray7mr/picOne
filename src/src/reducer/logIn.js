export default function LogIn(state=[],action){
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.payload
      break;
    default:
      return false;
  }
}
