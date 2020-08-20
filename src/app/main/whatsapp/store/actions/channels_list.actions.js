import WhatsAppChannelService from "app/services/whatsapp/WhatsAppChannelService";

export const GET_CHANNEL_LIST = "[CHANNEL] GET CHANNEL LIST";

export function getChannelList() {
  return dispatch =>
    WhatsAppChannelService.getChannelList()
      .then(response => {
        return dispatch({
          type: GET_CHANNEL_LIST,
          payload: response.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
}
