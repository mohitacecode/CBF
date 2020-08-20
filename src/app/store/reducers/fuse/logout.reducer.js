import * as Actions from "../../actions/fuse";

const initialState = {
  success: true,
};

const logout = (state = initialState, action) => {
  console.log(initialState.success);
  switch (action.type) {
    case Actions.LOGOUT_SUCCESS: {
      return {
        ...state,
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default logout;
