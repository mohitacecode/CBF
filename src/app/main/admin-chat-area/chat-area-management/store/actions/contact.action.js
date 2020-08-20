export const SAVE_CONTACT = "SAVE_CONTACT";
export const GET_CONTACT = "GET_CONTACT";

export const saveContact = contact => dispatch => {
  dispatch({
    type: SAVE_CONTACT,
    data: contact,
  });
};
