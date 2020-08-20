export const ADD_ROOM = "ADD_ROOM";

export const roomActions = room => dispatch => {
  dispatch({
    type: ADD_ROOM,
    room_name: room,
  });
};
