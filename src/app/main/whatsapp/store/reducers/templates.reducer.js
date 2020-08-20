import * as Actions from "../actions";

const initialState = {
  data: [],
};

const templates = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TEMPLATES: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.ADD_TEMPLATES: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default templates;
