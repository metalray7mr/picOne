export default function Owner(state=[],action) {
  switch (action.type) {
    case 'OWNER':
      return action.payload;
      break;
    default:
      return state;
  }
}
