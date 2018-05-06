export default function ChatSingle(state=[],action) {
  switch (action.type) {
    case 'CHAT_SINGLE':
      return action.payload;
      break;
    default:
      return state;
  }
}
