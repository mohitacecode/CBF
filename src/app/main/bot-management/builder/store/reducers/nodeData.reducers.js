import * as Actions from "../actions";

const initialState = {
  node: {},
  loading: true,
};

const nodeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default nodeDataReducer;
