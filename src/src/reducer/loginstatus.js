export default function LoginStatus(state=[],action) {
  switch (action.type) {
    case 'LOGIN_STATUS':
      return action.payload;
      break;
    default:
      return state;
  }
}
