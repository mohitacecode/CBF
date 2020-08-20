import * as Actions from "../actions";

const botList = {
  data: [],
  active: "",
};

export default (state = botList, action = {}) => {
  switch (action.type) {
    case Actions.GET_BOT_LISTING: {
      return { ...state, data: action.payload };
    }
    case Actions.SET_ACTIVE_BOT: {
      return { ...state, active: action.payload };
    }
    default:
      return state;
  }
};
