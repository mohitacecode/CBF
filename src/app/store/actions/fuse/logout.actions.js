// fuse
import { showMessage } from "app/store/actions/fuse";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function logoutUser() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
