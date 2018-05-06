export default function ChatList(state = [], action) {
  switch (action.type) {
    case 'CHAT_LIST':
      var b = [];
      if (action.payload === null) {
        return [];
      } else if (action.payload) {
        for (var i = 0; i < state.length; i++) {
          if (state[i].chatID === action.payload.chatID) {
            if (i === 0) {
              state.splice(i, 1);
            } else state.splice(i, i);
          }
        }
        b = [action.payload, ...state];
        b.sort(function(a, b) {
          return a.timeStamp < b.timeStamp
            ? 1
            : b.timeStamp > a.timeStamp ? -1 : 0;
        });
      }
      return b;
      break;
    default:
      return state;
  }
}
