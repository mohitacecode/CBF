import * as Actions from "../actions";

const initialState = {
  data: null,
};

const templatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TEMPLATES: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default templatesReducer;
