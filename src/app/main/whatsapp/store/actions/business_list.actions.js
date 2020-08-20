import WhatsAppBusinessService from "app/services/whatsapp/WhatsAppBusinessService";

export const GET_ACCOUNT_LIST = "[CHANNEL] GET ACCOUNT LIST";

export function getAccountList() {
  return dispatch =>
    WhatsAppBusinessService.getAccountList()
      .then(response => {
        //console.log(response)
        return dispatch({
          type: GET_ACCOUNT_LIST,
          payload: response.data,
        });
      })
      .catch(err => {
        //console.error(err)
      });
}
