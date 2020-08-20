import { showMessage } from "app/store/actions/fuse";
import PasswordService from "app/services/profile/PasswordService";

export const SAVE_PASSWORD = "[PASSWORD] SAVE PASSWORD";
export const SAVE_ERROR = "[PASSWORD] SAVE ERROR";

export function savePassword(data) {
  return dispatch =>
    PasswordService.addPassword({
      data: { ...data },
    })
      .then(response => {
        dispatch(showMessage({ message: "Password Updated", variant: "success" }));
        return dispatch({
          type: SAVE_PASSWORD,
          payload: response.data,
        });
      })
      .catch(error => {
        return dispatch({
          type: SAVE_ERROR,
          payload: error,
        });
      });
}
