import * as Actions from "../actions";

const chatData = {
  data: [],
  headers: [],
  checkBoxHeaders: [],
  loading: true,
  exporting: false,
  visitors: null,
  leads: null,
};

export default (state = chatData, action = {}) => {
  switch (action.type) {
    case Actions.GET_CHAT_DATA: {
      return {
        ...state,
        data: action.payload.chatData,
        headers: action.payload.headers,
        checkBoxHeaders: action.payload.checkBoxHeaders,
      };
    }
    case Actions.GET_CHAT_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case Actions.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.EXPORTING: {
      return {
        ...state,
        exporting: action.payload,
      };
    }
    case Actions.GET_VISITORS: {
      return {
        ...state,
        visitors: action.payload,
      };
    }
    case Actions.GET_LEADS: {
      return {
        ...state,
        leads: action.payload,
      };
    }
    case Actions.DATE_FILTER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    // case Actions.SAVE_EMAIL: {
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // }
    default:
      return state;
  }
};
