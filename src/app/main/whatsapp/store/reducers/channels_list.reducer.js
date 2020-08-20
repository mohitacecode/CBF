import * as Actions from "../actions";

const initialState = {
  data: [],
  status: null,
};

const channel_listReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CHANNEL_LIST: {
      return {
        ...state,
        data: action.payload,
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

export default channel_listReducer;
