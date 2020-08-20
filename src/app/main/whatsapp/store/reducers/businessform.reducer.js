import * as Actions from "../actions";

const initialState = {
  data: [],
  status: null,
  botList: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACCOUNT: {
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
    case Actions.DELETE_ACCOUNT: {
      let newData = [...state.data];
      return {
        ...state,
        data: newData.filter(obj => obj.project_id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
