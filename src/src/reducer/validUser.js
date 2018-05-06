export default function ValidUser(state=[],action){
  switch (action.type) {
    case 'VALID_USER':
      return action.payload
      break;
    default:
      return state;
  }
}
