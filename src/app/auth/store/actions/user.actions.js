import * as FuseActions from "app/store/actions/fuse";
import { showMessage } from "app/store/actions/fuse";

import LoginService from "app/services/login/LoginService";
import ProfileService from "app/services/profile/ProfileService";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";
export const FORGOT_PASSWORD_OK = "[USER] FORGOT PASSWORD OK";
export const FORGOT_PASSWORD_NOT_OK = "[USER] FORGOT PASSWORD NOT OK";
export const GET_PROFILE = "[PROFILE] GET PROFILE";
export const IS_AUTH = "[PROFILE] IS AUTH";
export const GET_AUTH = "[PROFILE] GET AUTH";
export const SAVE_EMAIL = "[CHATDATA] SAVE_EMAIL";

/**
 * Set user data from Auth0 token data
 */

export function setEmail(data, choosenEmail) {
  return dispatch =>
    ProfileService.updateProfile({
      data: { email: data, google_granted_acc: choosenEmail },
    }).then(response => {
      return dispatch({
        type: SAVE_EMAIL,
        payload: response.data,
      });
    });
}
export function setIsAuth(isauth) {
  return dispatch => isauth => {
    dispatch({
      type: IS_AUTH,
      payload: isauth,
    });
  };
}

export function getProfile() {
  return dispatch =>
    ProfileService.getProfile({ errorNotify: false })
      .then(response => {
        dispatch({
          type: GET_PROFILE,
          payload: response.data,
        });
      })
      .catch(() =>
        dispatch({
          type: IS_AUTH,
          payload: false,
        })
      );
}

export function forgotPassword(email) {
  return dispatch =>
    LoginService.forgotPassword({
      errorNotify: false,
      data: {
        email: email,
      },
    })
      .then(data => {
        dispatch(showMessage({ message: "Reset link sent... check your mails" }));
        return dispatch({
          type: FORGOT_PASSWORD_OK,
          status: data.status,
        });
      })
      .catch(error => {
        if (error.status === 400 || error.status === 404) {
          dispatch(showMessage({ message: "Email ID not found in database " }));
        } else if (error.status === 500) {
          dispatch(showMessage({ message: "Server Error" }));
        }
        return dispatch({
          type: FORGOT_PASSWORD_NOT_OK,
          payload: error,
        });
      });
}
export function resetPassword(password, password1, uidb64, token) {
  return dispatch => {
    LoginService.resetPassword({
      errorNotify: false,
      pathParam: {
        uidb64: uidb64,
        token: token,
      },
      data: {
        password: password,
        re_password: password,
      },
    })
      .then(response => {
        if (response.data.status === "Password Changed") {
          dispatch(showMessage({ message: "Password Changed Successfully ", variant: "success" }));
        } else if (response.data.status === "Token Expired") {
          dispatch(showMessage({ message: "Token Expired" }));
        }
        return dispatch({
          type: FORGOT_PASSWORD_OK,
          status: response.status,
        });
      })
      .catch(error => {
        if (error.status === "Token Expired" || error.status === 406) {
          console.log("xdfg");
          dispatch(showMessage({ message: "Token Expired", variant: "error" }));
        }
        return dispatch({
          type: FORGOT_PASSWORD_NOT_OK,
          payload: error,
        });
      });
  };
}
/**
 * Logout
 */
export function logoutUser() {
  return dispatch => {
    ProfileService.logout().then(response => {
      dispatch(FuseActions.setInitialSettings());
      return dispatch({
        type: USER_LOGGED_OUT,
      });
    });
  };
}
