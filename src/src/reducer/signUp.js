export default function SignUp(state=[],action){
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return action.payload
      break;
    default:
      return false;
  }
}
