const chatData = [];

const messagesReducer = (state = chatData, action) => {
  switch (action.type) {
    case "SAVE_MESSAGES":
      return [action.data, ...state];
    default:
      return state;
  }
};

export default messagesReducer;
