import { showMessage } from "app/store/actions/fuse";
import WhatsAppBusinessService from "app/services/whatsapp/WhatsAppBusinessService";

export const SAVE_DETAILS = "[ACCOUNT] SAVE DETAILS";

export function saveDetails(data) {
  return dispatch =>
    WhatsAppBusinessService.saveDetails({
      data: { ...data },
    }).then(response => {
      dispatch(showMessage({ message: "Request created succesfully", variant: "success" }));
    });
}

export function editDetails(data, id) {
  return dispatch =>
    WhatsAppBusinessService.editDetails({
      data: { ...data },
      pathParam: { id: id },
    }).then(response => {
      dispatch(showMessage({ message: "Updated succesfully", variant: "success" }));
    });
}
