import DashboardService from "app/services/dashboard/DashboardService";

export const GET_STATS = "[STATS] GET STATS";
export const ADD_BOT = "[BOT] ADD BOT";
export const UPDATE_BOT = "[BOT] UPDATE BOT";

export function getStats() {
  return dispatch =>
    DashboardService.getStats().then(response =>
      dispatch({
        type: GET_STATS,
        stats: response.data,
      })
    );
}
