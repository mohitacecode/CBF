import * as Actions from "../actions";

const initialState = {
  data: [],
  status: null,
};

const account_listReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACCOUNT_LIST: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.SAVE_ACCOUNT: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.NEW_ACCOUNT: {
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

export default account_listReducer;
