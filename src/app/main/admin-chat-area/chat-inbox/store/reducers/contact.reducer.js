import * as Actions from "../actions";

const contact = {};

const messagesReducer = (state = contact, action) => {
  switch (action.type) {
    case Actions.SAVE_CONTACT:
      return { ...action.data };
    case Actions.GET_CONTACT:
      return { ...state };
    default:
      return state;
  }
};

export default messagesReducer;
