export default function ReqList(state=[],action) {
  switch (action.type) {
    case 'REQ_LIST':
      return action.payload;
      break;
    default:
      return state;
  }
}
