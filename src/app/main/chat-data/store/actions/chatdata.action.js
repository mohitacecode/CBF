import _ from "@lodash";
import chatService from "app/services/chatdata/service";
import Constants from "app/utils/Constants";
import { showMessage } from "app/store/actions/fuse";
export const GET_CHAT_DATA = "[CHATDATA] GET_CHAT_DATA";
export const GET_CHAT_HEADERS = "[CHATDATA] GET_CHAT_HEADERS";
export const LOADING = "[CHATDATA] LOADING";
export const EXPORTING = "[CHATDATA] EXPORTING";
export const GET_VISITORS = "[CHATDATA] GET_VISITORS";
export const GET_LEADS = "[CHATDATA] GET_LEADS";
export const DATE_FILTER = "[CHATDATA] DATE_FILTER";
// export const SAVE_EMAIL = "[CHATDATA] SAVE_EMAIL";

// export function setEmail(data, choosenEmail) {
//   return dispatch =>
//     chatService
//       .setEmail({
//         data: { email: data, google_granted_acc: choosenEmail },
//       })
//       .then(response => {
//         return dispatch({
//           type: SAVE_EMAIL,
//           payload: response.data,
//         });
//       });
// }

export function googleSheets(token, botId) {
  return dispatch =>
    chatService
      .googleSheets({
        data: { token: token },
        pathParam: { botId },
      })
      .then(response => {
        console.log(response);
        dispatch(showMessage({ message: "Google sheet created succesfully", variant: "success" }));
      });
}

export const getData = botId => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const chatRes = await chatService.getData({ pathParam: { botId } });
  if (_.size(chatRes.data)) {
    const chatData = chatRes.data.map(item => {
      const obj = { room_name: item.room_name };
      for (let key in item.variables) {
        obj[key] = item.variables[key];
        // obj[_.startCase(_.snakeCase(key.replace("@", "")))] =
        //   item.variables[key];
      }
      return obj;
    });
    const headersRes = await chatService.getHeaders({ pathParam: { botId } });
    const headers = [{ title: "Room Name", field: "room_name" }];
    headersRes.data.forEach(item => {
      if (typeof item === "object") {
        for (let key in item.bot_lead_json) {
          headers.push({
            title: _.startCase(_.snakeCase(key.replace("@", ""))),
            field: key,
          });
        }
      }
    });

    dispatch({
      type: GET_CHAT_DATA,
      payload: { chatData, headers, checkBoxHeaders: headers },
    });
  } else {
    dispatch({
      type: GET_CHAT_DATA,
      payload: { chatData: [], headers: [], checkBoxHeaders: [] },
    });
  }
  dispatch({ type: LOADING, payload: false });
};

export const setColHeaders = cols => {
  return { type: GET_CHAT_HEADERS, payload: cols };
};

export const exportData = botId => async dispatch => {
  dispatch({ type: EXPORTING, payload: true });
  // await chatService.exportData({ pathParam: { botId, format: "csv" } });
  window.open(`${Constants.api.baseUrl}/chatdata/export/bot/${botId}/csv`);
  dispatch({ type: EXPORTING, payload: false });
};

export function sendEmail(botId) {
  console.log(botId);
  return dispatch =>
    chatService
      .sendEmail({
        pathParam: { botId },
      })
      .then(response => {
        console.log(response);
        dispatch(
          showMessage({ message: "An Email has been sent to your account", variant: "success" })
        );
      });
}
export function getVisitors(botId) {
  return dispatch =>
    chatService
      .getVisitors({
        pathParam: { botId },
      })
      .then(response => {
        return dispatch({
          type: GET_VISITORS,
          payload: response.data,
        });
      });
}
export function getLeads(botId) {
  return dispatch =>
    chatService
      .getLeads({
        pathParam: { botId },
      })
      .then(response => {
        return dispatch({
          type: GET_LEADS,
          payload: response.data,
        });
      });
}

export function dateFilter(botId, start_date, end_date) {
  var date = new Date(end_date);
  date.setDate(date.getDate() + 1);
  end_date = date.toISOString().slice(0, 10);
  return dispatch =>
    chatService
      .dateFilter({
        pathParam: { botId, start_date, end_date },
      })
      .then(response => {
        let chatData = [];
        if (_.size(response.data)) {
          chatData = response.data.map(item => {
            const obj = { room_name: item.room_name };
            for (let key in item.bot_lead_json) {
              obj[key] = item.bot_lead_json[key];
              // obj[_.startCase(_.snakeCase(key.replace("@", "")))] =
              //   item.variables[key];
            }
            return obj;
          });
        }
        return dispatch({
          type: DATE_FILTER,
          payload: chatData,
        });
      });
}
