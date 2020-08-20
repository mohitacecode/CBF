import { showMessage } from "app/store/actions/fuse";
import WhatsAppBusinessService from "app/services/whatsapp/WhatsAppBusinessService";
import WhatsAppChannelService from "app/services/whatsapp/WhatsAppChannelService";

export const GET_ACCOUNT = "[ACCOUNT] GET ACCOUNT";
export const SAVE_ACCOUNT = "[ACCOUNT] SAVE ACCOUNT";
export const NEW_ACCOUNT = "[ACCOUNT] NEW ACCOUNT";
export const GET_BOTLIST = "[ACCOUNT] GET BOTLIST";
export const DELETE_ACCOUNT = "[ACCOUNT] DELETE ACCOUNT";

export function deleteAccount(project_id, pk) {
  return dispatch =>
    WhatsAppBusinessService.deleteAccount({
      data: { project_id: project_id },
      pathParam: { pk: pk },
    }).then(response => {
      dispatch(showMessage({ message: "Account Deleted Succesfully", variant: "success" }));
      return dispatch({
        type: DELETE_ACCOUNT,
        id: project_id,
      });
    });
  // .then((response) => {
  // 	dispatch(showMessage({ message: "Account Deleted" }));
  // });
}

export function updateAccount(project_id, restart_flow, published, pk) {
  return dispatch =>
    WhatsAppBusinessService.updateAccount({
      data: {
        project_id: project_id,
        restart_flow: restart_flow,
        published: published,
      },
      pathParam: { pk: pk },
    }).then(response => {
      dispatch(showMessage({ message: "Changes Saved", variant: "success" }));
      return dispatch({
        type: GET_ACCOUNT,
        payload: response.data,
        status: response.status,
      });
    });
}
export function changeAccountStatus(status, pk) {
  return dispatch =>
    WhatsAppBusinessService.updateAccount({
      data: { published: status },
      pathParam: { pk: pk },
    }).then(response => {
      dispatch(showMessage({ message: "Changes Saved", variant: "success" }));
      return dispatch({
        type: GET_ACCOUNT,
        payload: response.data,
        status: response.status,
      });
    });
}

export function getAccount(pk) {
  return dispatch =>
    WhatsAppBusinessService.getAccount({
      pathParam: { pk: pk },
    }).then(response => {
      return dispatch({
        type: GET_ACCOUNT,
        payload: response.data,
        status: response.status,
      });
    });
}
export function createAccount(data, hist) {
  return dispatch =>
    WhatsAppBusinessService.addAccount({
      data: { ...data },
    })
      .then(response => {
        dispatch(showMessage({ message: "Account Created", variant: "success" }));
        hist.push(`/businessform/${response.data.wab_hash}`);
        console.log(response);
        return dispatch({
          type: NEW_ACCOUNT,
          payload: response.data,
          status: response.status,
        });
      })
      .catch(err => {
        if (err.status === 409)
          dispatch(showMessage({ message: "Account With This Number Exists", variant: "error" }));
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
export function newAccount() {
  return dispatch => {
    return dispatch({
      type: GET_ACCOUNT,
      payload: null,
    });
  };
}
//export function addBotToChannel(botHash, data) {
// 	return (dispatch) =>
// 		WhatsAppBusinessService.addChannel({
// 			data: { ...data },
// 			pathParam: {}
// 		}).then((response) => {
// 			dispatch(showMessage({ message: "Channel Created" }));
// 			return dispatch({
// 				type: NEW_ACCOUNT,
// 				payload: response.data,
// 				status: response.status,
// 			});
// 		});
// }
