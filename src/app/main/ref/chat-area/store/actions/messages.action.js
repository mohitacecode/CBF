export const saveMessages = msg => dispatch => {
  dispatch({
    type: "SAVE_MESSAGES",
    data: msg,
  });
};
