import * as Actions from "../actions";

const initialState = {
  role: [], // guest
  data: {
    displayName: "John Doe",
    photoURL: "static/assets/images/avatars/Velazquez.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
  status: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.FORGOT_PASSWORD_OK: {
      return {
        ...initialState,
        ...action.status,
      };
    }
    case Actions.FORGOT_PASSWORD_NOT_OK: {
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
