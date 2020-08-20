import * as Actions from "../actions";

const stats = {};

const coursesReducer = (state = stats, action) => {
  switch (action.type) {
    case Actions.GET_STATS: {
      return { ...action.stats };
    }
    case Actions.UPDATE_BOT: {
      let newData = [...state];
      let index = newData.findIndex(obj => obj.id === action.bot.id);
      if (index) {
        newData[index] = { ...newData[index], ...action.bot };
      }
      return newData;
    }
    default: {
      return state;
    }
  }
};

export default coursesReducer;
