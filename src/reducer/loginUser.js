function loginUser(state=[],action){
  switch (action.type) {
    case 'USER':
      return action.payload;
    case 'USERERROR':
    console.log(action.payload);
     return action.payload;
    default:
      return state;
  }
}
export default loginUser;
