import * as Actions from "../actions";

const initialState = {
  success: false,
  data: null,
  error: {
    email: null,
    password: null,
    first_name: null,
    last_name: null,
  },
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTER_SUCCESS: {
      return {
        ...initialState,
        success: true,
        data: action.data,
      };
    }
    case Actions.REGISTER_ERROR: {
      return {
        success: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default register;
