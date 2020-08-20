// services
import TeamService from "app/services/admin/teams";

export const GET_TEAMS = "[OPERATORS] GET TEAMS";
export const SET_TEAMS_SEARCH_TEXT = "[OPERATORS] SET TEAMS SEARCH TEXT";

export function getTeamOperators(id, setNoData, setLoading) {
  setLoading(true);
  return dispatch =>
    TeamService.getTeamOperators({ pathParam: { team_id: id } })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: GET_TEAMS,
            payload: res.data,
          });
          setNoData(false);
        } else {
          setNoData(true);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setNoData(true);
      });
}

export function setTeamsSearchText(event) {
  return {
    type: SET_TEAMS_SEARCH_TEXT,
    searchText: event.target.value,
  };
}
