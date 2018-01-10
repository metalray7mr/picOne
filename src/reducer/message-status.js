export default function status(state=['loading'],action) {
 switch (action.type) {
  case 'MSG_SENT':
  return action.payload;
  break;
   default:
     return state;
 }
}
