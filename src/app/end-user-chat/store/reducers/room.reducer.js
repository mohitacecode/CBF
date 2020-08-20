import * as Actions from "../actions";

const clientData = {
  room: null,
};

const roomReducer = (state = clientData, action) => {
  switch (action.type) {
    case Actions.ADD_ROOM:
      return { ...state, room: action.room_name };
    default:
      return state;
  }
};

export default roomReducer;
