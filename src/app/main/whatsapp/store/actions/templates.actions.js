import WhatsAppTemplatesService from "app/services/whatsapp/WhatsAppTemplatesService";
import { showMessage } from "app/store/actions/fuse";
export const GET_TEMPLATES = "[CHANNEL] GET TEMPLATES";
export const ADD_TEMPLATES = "[CHANNEL] ADD TEMPLATES";

export function getTemplates() {
  return dispatch =>
    WhatsAppTemplatesService.getTemplates()
      .then(response => {
        return dispatch({
          type: GET_TEMPLATES,
          payload: response.data,
        });
      })
      .catch(err => {
        //console.error(err)
      });
}

export function saveTemplates(data, hist) {
  return dispatch =>
    WhatsAppTemplatesService.addTemplates({
      data: { ...data },
    })
      .then(response => {
        console.log(response);
        dispatch(showMessage({ message: "Template Added Succesfully", variant: "success" }));
        hist.push("/whatsappTemplates");
        return dispatch({
          type: ADD_TEMPLATES,
          payload: response.data,
        });
      })
      .catch(err => {
        //console.error(err)
      });
}
