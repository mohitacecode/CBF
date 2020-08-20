import * as Actions from "../actions";

const initialState = {
  data: null,
  status: null,
  botList: [],
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CHANNEL: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.GET_BOTLIST: {
      return {
        ...state,
        botList: action.payload,
      };
    }
    case Actions.SAVE_CHANNEL: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.NEW_CHANNEL: {
      return {
        ...state,
        data: action.payload,
        status: action.status,
      };
    }
    default: {
      return state;
    }
  }
};

export default channelReducer;
