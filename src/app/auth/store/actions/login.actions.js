// service
import LoginService from "app/services/login/LoginService";
// fuse
import { showMessage } from "app/store/actions/fuse/message.actions";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function submitLogin({ email, password }) {
  return dispatch =>
    LoginService.loginUser({
      data: {
        password: password,
        email: email,
      },
    })
      .then(data => {
        return dispatch({
          type: LOGIN_SUCCESS,
          user: data.data.user,
          permission_routing: data.data.permission_routing,
          navbar_routing: data.data.navbar_routing,
        });
      })
      .catch(error => {
        console.log(error);
        if (error.status === 400 || error.status === 404 || error.status === 401) {
          dispatch(showMessage({ message: "Invalid Credentials" }));
        } else if (error.status === 500) {
          dispatch(showMessage({ message: "Server Error" }));
        }
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}
export function googleLogin(accessToken) {
  return dispatch =>
    LoginService.google_Login({
      data: {
        token: accessToken,
      },
    })
      .then(data => {
        return dispatch({
          type: LOGIN_SUCCESS,
          user: {
            new_user: data.data.new_user,
          },
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}

export function facebookLogin(accessToken) {
  return dispatch =>
    LoginService.facebook_Login({
      data: {
        token: accessToken,
      },
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
}
