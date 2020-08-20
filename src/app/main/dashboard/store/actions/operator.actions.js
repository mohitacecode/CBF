import { showMessage } from "app/store/actions/fuse";
import AdminOwnerService from "app/services/admin/owner/AdminOwnerService";

export const GET_OPERATOR = "[OPERATOR] GET OPERATOR";
export const SAVE_OPERATOR = "[OPERATOR] SAVE OPERATOR";
export const NEW_OPERATOR = "[OPERATOR] NEW OPERATOR";

export function getOperator(id) {
  return dispatch =>
    AdminOwnerService.getOperator({
      pathParam: { id: id },
    }).then(response => {
      return dispatch({
        type: GET_OPERATOR,
        payload: response.data,
      });
    });
}
export function saveOperator(id, data, hist) {
  if (id === "new") {
    return dispatch =>
      AdminOwnerService.addOperator({
        data: { ...data },
      })
        .then(response => {
          dispatch(showMessage({ message: "Operator Saved" }));
          hist.push("/operators");
          dispatch({
            type: SAVE_OPERATOR,
            payload: response.data,
          });
        })
        .catch(err => {
          dispatch(showMessage({ message: "Failed To Add/Email Already Taken", variant: "error" }));
        });
  } else {
    return dispatch =>
      AdminOwnerService.updateOperator({
        data: { ...data },
        pathParam: { id: id },
      })
        .then(response => {
          dispatch(showMessage({ message: "Operator Updated" }));
          hist.push("/operators");
          return dispatch({
            type: SAVE_OPERATOR,
            payload: response.data,
          });
        })
        .catch(err => {
          dispatch(showMessage({ message: "Failed To Update", variant: "error" }));
        });
  }
}

export function newOperator() {
  return dispatch =>
    AdminOwnerService.getNewOperator().then(response => {
      return dispatch({
        type: NEW_OPERATOR,
        payload: null,
        password: response.data.password,
      });
    });
}
