import * as Actions from "../actions";

const initialState = {
  error: null,
  user: {},
  isAuthenticate: false,
  permissionRoutes: [],
  navbarRoutes: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS: {
      return {
        ...initialState,
        isAuthenticate: true,
        user: action.user,
        permissionRoutes: action.permission_routing,
        navbarRoutes: action.navbar_routing,
      };
    }
    case Actions.LOGIN_ERROR: {
      return {
        isAuthenticate: false,
        error: action.payload,
        user: {},
        permissionRoutes: [],
        navbarRoutes: [],
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return {
        ...initialState,
        error: null,
        isAuthenticate: false,
        user: {},
      };
    }
    case Actions.GET_PROFILE: {
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };
    }

    case Actions.IS_AUTH: {
      return {
        ...state,
        user: action.payload === true ? state.user : {},
        isAuthenticate: action.payload,
      };
    }
    case Actions.SAVE_EMAIL: {
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
