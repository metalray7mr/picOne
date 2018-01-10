export default function loginStatus(state=[],action){
  switch (action.type) {
    case 'STATUS':
      return action.payload;
      break;
    default:
      return state;
  }
}
