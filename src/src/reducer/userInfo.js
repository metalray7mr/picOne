export default function UserInfo(state=[],action) {
  switch (action.type) {
    case 'USER_INFO':
      return action.payload;
      break;
    default:
      return false;
  }
}
