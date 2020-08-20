import TemplatesService from "app/services/templates/TemplatesService";

export const GET_TEMPLATES = "[TEMPLATES] GET TEMPLATES";
export const CREATE_BOT = "[TEMPLATES] CREATE TEMPLATES";

export function getTemplates() {
  return dispatch =>
    TemplatesService.getTemplates().then(response => {
      //console.log(response);
      return dispatch({
        type: GET_TEMPLATES,
        payload: response.data,
      });
    });
}

export function createBot(bot_hash, hist) {
  return dispatch =>
    TemplatesService.createBot({
      data: { template_bot_hash: bot_hash },
    }).then(response => {
      //console.log(response);
      // return dispatch({
      // 	type: CREATE_BOT,
      // 	payload: response.data
      // });
      hist.push(`/builder/${response.data.bot_hash}`);
    });
}
