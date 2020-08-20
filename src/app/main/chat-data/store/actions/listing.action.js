import chatService from "app/services/chatdata/service";

export const GET_BOT_LISTING = "[CHATDATA] GET_BOT_LISTING";
export const SET_ACTIVE_BOT = "[CHATDATA] SET_ACTIVE_BOT";

export function getListing() {
  return async dispatch => {
    const res = await chatService.getListing();
    const bots = [];
    for (let key in res.data) {
      bots.push({ label: res.data[key], value: key });
    }
    dispatch({
      type: GET_BOT_LISTING,
      payload: bots,
    });
    if (bots.length) {
      dispatch(setActiveBot(bots[0].value));
    }
  };
}

export function setActiveBot(value) {
  return {
    type: SET_ACTIVE_BOT,
    payload: value,
  };
}
