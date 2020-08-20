import * as Actions from "../actions";

const initialState = {
  data: null,
  password: "",
};

const operatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_OPERATOR: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.SAVE_OPERATOR: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.NEW_OPERATOR: {
      return {
        ...state,
        data: null,
        password: action.password,
      };
    }
    default: {
      return state;
    }
  }
};

export default operatorReducer;
