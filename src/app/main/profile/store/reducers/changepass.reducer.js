import * as Actions from "../actions";

const initialState = {
  data: null,
};

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SAVE_PASSWORD: {
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

export default passwordReducer;
