export default function msg(state=[],action){
  switch (action.type) {
    case 'GET_MSG':
      return action.payload;
      break;
    default:
      return state;
  }
}
