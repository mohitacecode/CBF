import { showMessage } from "app/store/actions/fuse";
import WhatsAppChannelService from "app/services/whatsapp/WhatsAppChannelService";

export const GET_CHANNEL = "[CHANNEL] GET CHANNEL";
export const SAVE_CHANNEL = "[CHANNEL] SAVE CHANNEL";
export const NEW_CHANNEL = "[CHANNEL] NEW CHANNEL";
export const GET_BOTLIST = "[CHANNEL] GET BOTLIST";

export function deleteChannel(channel_hash, hist) {
  return dispatch =>
    WhatsAppChannelService.deleteChannel({
      pathParam: { pk: channel_hash },
    }).then(response => {
      dispatch(showMessage({ message: "Channel Deleted" }));
      hist.push("/whatsappChannels");
    });
}

export function updateChannel(data, channel_hash) {
  return dispatch =>
    WhatsAppChannelService.updateChannel({
      data: { ...data },
      pathParam: { pk: channel_hash },
    }).then(response => {
      dispatch(showMessage({ message: "Changes Saved", variant: "success" }));
    });
}
export function getChannel(channel_hash) {
  return dispatch =>
    WhatsAppChannelService.getChannel({
      pathParam: { pk: channel_hash },
    }).then(response => {
      return dispatch({
        type: GET_CHANNEL,
        payload: response.data,
        status: response.status,
      });
    });
}
export function createChannel(data, hist) {
  return dispatch =>
    WhatsAppChannelService.addChannel({
      data: { ...data },
    })
      .then(response => {
        dispatch(showMessage({ message: "Channel Created", variant: "success" }));
        hist.push(`/channelform/${response.data.channel_hash}`);
        return dispatch({
          type: NEW_CHANNEL,
          payload: response.data,
          status: response.status,
        });
      })
      .catch(err => {
        if (err.status === 409)
          dispatch(showMessage({ message: "Channel With This Number Exists", variant: "error" }));
      });
}
export function getBotList() {
  return dispatch =>
    WhatsAppChannelService.getBotList().then(response => {
      let data = response.data.filter(item => item.chatbot_type === "whatsapp");
      return dispatch({
        type: GET_BOTLIST,
        payload: data,
      });
    });
}
export function newChannel() {
  return dispatch => {
    return dispatch({
      type: GET_CHANNEL,
      payload: null,
    });
  };
}
//export function addBotToChannel(botHash, data) {
// 	return (dispatch) =>
// 		WhatsAppChannelService.addChannel({
// 			data: { ...data },
// 			pathParam: {}
// 		}).then((response) => {
// 			dispatch(showMessage({ message: "Channel Created" }));
// 			return dispatch({
// 				type: NEW_CHANNEL,
// 				payload: response.data,
// 				status: response.status,
// 			});
// 		});
// }
