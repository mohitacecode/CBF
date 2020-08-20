import * as Actions from "../actions";

const chatData = [];

const messagesReducer = (state = chatData, action) => {
  switch (action.type) {
    case Actions.SAVE_MESSAGES:
      return [...state, action.chats];
    case Actions.CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
