export default function ReqList(state=[],action) {
  switch (action.type) {
    case 'CHAT_LIST_ITEM':
      return action.payload;
      break;
    default:
      return state;
  }
}
