export const SAVE_MESSAGES = "SAVE_MESSAGES";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

export const saveMessages = chatting => dispatch => {
  dispatch({
    type: SAVE_MESSAGES,
    chats: chatting,
  });
};

export const clearMessages = () => dispatch => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};
