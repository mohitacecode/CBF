import * as Actions from "../actions";

const initialState = {
  data: [],
  searchText: "",
};

const operatorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_OPERATORS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.SET_OPERATOR_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default: {
      return state;
    }
  }
};

export default operatorListReducer;
