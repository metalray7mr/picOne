export default function user(state=['loading'],action) {
 switch (action.type) {
   case 'USER_INFO':
     return action.payload;
     break;
   default:
     return state;
 }
}
