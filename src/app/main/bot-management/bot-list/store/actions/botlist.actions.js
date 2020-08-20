import BotManagementService from "app/services/bot/BotManagementService";
import BotDetailService from "app/services/bot//BotDetailService";
import { showMessage } from "app/store/actions/fuse";

export const GET_BOT = "[BOT] GET BOT";
export const GET_BOT_ERROR = "[BOT] GET BOT ERROR";
export const ADD_BOT = "[BOT] ADD BOT";
export const UPDATE_BOT = "[BOT] UPDATE BOT";
export const DELETE_BOT = "[BOT] DELETE BOT";

export function duplicateBot(hash) {
  return dispatch =>
    BotManagementService.duplicateBot({
      data: {
        bot_hash: hash,
      },
    })
      .then(response => {
        dispatch(showMessage({ message: "Bot Duplicated Succesfully", variant: "success" }));
        return dispatch({
          type: ADD_BOT,
          bot: response.data,
        });
      })
      .catch(err => {
        if (err.status === 402) {
          dispatch(
            showMessage({ message: "bot list disabled due to non-payment", variant: "error" })
          );
        }
      });
}

export function deleteBot(id) {
  return dispatch =>
    BotManagementService.deleteBot({
      pathParam: { id: id },
    })
      .then(response => {
        dispatch(showMessage({ message: "Bot Deleted Succesfully", variant: "success" }));
        return dispatch({
          type: DELETE_BOT,
          bot: id,
        });
      })
      .catch(err => {
        if (err.status === 402) {
          dispatch(
            showMessage({ message: "bot list disabled due to non-payment", variant: "error" })
          );
        }
      });
}

export function getBots() {
  return dispatch =>
    BotManagementService.getBots({
      errorNotify: false,
    })
      .then(response => {
        console.log(response);
        return dispatch({
          type: GET_BOT,
          bots: [...response.data],
        });
      })
      .catch(err => {
        if (err.status === 402) {
          dispatch(
            showMessage({ message: "bot list disabled due to non-payment", variant: "error" })
          );
        }
      });
}

export function addBot(title, bot_type, hist) {
  return dispatch =>
    BotManagementService.addBot({
      data: {
        title: title,
        chatbot_type: bot_type,
      },
    }).then(response => {
      dispatch({
        type: ADD_BOT,
        bot: response.data,
      });
      hist.push(`/builder/${response.data.bot_hash}`);
    });
}

export function updateBotDetails(id, data) {
  return dispatch =>
    BotDetailService.updateBotDetails({
      data: { ...data },
      pathParam: { id: id },
    }).then(response => {
      return dispatch({
        type: UPDATE_BOT,
        bot: response.data,
      });
    });
}
