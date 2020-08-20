// service
import RegisterService from "app/services/register/RegisterService";

// fuse
import { showMessage } from "app/store/actions/fuse";

export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export function submitRegister({ first_name, last_name, password, email }) {
  return dispatch =>
    RegisterService.registerUser({
      data: {
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    })
      .then(data => {
        dispatch(
          showMessage({
            message: `Please Verify Your Account Now Using The Verification Link Sent To ${email}`,
            varient: "success",
          })
        );
        return dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch(error => {
        dispatch(showMessage({ message: "This email is already registered", varient: "error" }));
        return dispatch({
          type: REGISTER_ERROR,
          payload: error,
        });
      });
}
export function mailConfirm(uidb64, token) {
  return dispatch => {
    RegisterService.mailConfirm({
      pathParam: {
        uidb64: uidb64,
        token: token,
      },
    })
      .then(data => {
        return dispatch({
          type: REGISTER_SUCCESS,
          data: data.data,
        });
      })
      .catch(error => {
        if (error.status === "Token Expired" || error.status === 406)
          dispatch(showMessage({ message: "Token Expired", variant: "error" }));
        return dispatch({
          type: REGISTER_ERROR,
          payload: error.response.status,
        });
      });
  };
}
