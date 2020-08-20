import AdminOwnerService from "app/services/admin/owner/AdminOwnerService";

export const GET_OPERATORS = "[OPERATORS] GET OPERATORS";
export const SET_OPERATOR_SEARCH_TEXT = "[OPERATORS] SET OPERATOR SEARCH TEXT";

export function getOperators() {
  return dispatch =>
    AdminOwnerService.getOperators().then(response => {
      dispatch({
        type: GET_OPERATORS,
        payload: response.data,
      });
    });
}
export function changeAOstatus(id, data) {
  return dispatch =>
    AdminOwnerService.updateOperator({
      data: { ...data },
      pathParam: { id: id },
    }).then(() => {
      AdminOwnerService.getOperators().then(response => {
        dispatch({
          type: GET_OPERATORS,
          payload: response.data,
        });
      });
    });
}
export function deleteOperator(id, data) {
  return dispatch =>
    AdminOwnerService.deleteOperator({
      pathParam: { id: id },
    }).then(() => {
      AdminOwnerService.getOperators().then(response => {
        dispatch({
          type: GET_OPERATORS,
          payload: response.data,
        });
      });
    });
}
export function setOperatorsSearchText(event) {
  return {
    type: SET_OPERATOR_SEARCH_TEXT,
    searchText: event.target.value,
  };
}
