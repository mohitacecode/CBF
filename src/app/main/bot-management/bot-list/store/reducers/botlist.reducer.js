import * as Actions from "../actions";

const initialState = {
  bots: [],
  error: null,
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_BOT: {
      return {
        ...state,
        bots: [...action.bots],
      };
    }
    case Actions.ADD_BOT: {
      return {
        ...state,
        bots: [...state.bots, action.bot],
      };
    }
    case Actions.DELETE_BOT: {
      let newData = [...state.bots];
      return {
        ...state,
        bots: newData.filter(obj => obj.bot_hash !== action.bot),
      };
    }
    case Actions.UPDATE_BOT: {
      let newData = [...state.bots];
      let index = newData.findIndex(obj => obj.bot_hash === action.bot.bot_hash);
      if (index > -1) {
        newData[index] = { ...newData[index], ...action.bot };
      }
      return {
        ...state,
        bots: newData,
      };
    }
    default: {
      return state;
    }
  }
};

export default coursesReducer;
