import history from "@history";
import _ from "@lodash";
import * as FuseActions from "app/store/actions/fuse";
import LoginService from "app/services/login/LoginService";
import { showMessage } from "app/store/actions/fuse";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";
export const FORGOT_PASSWORD_OK = "[USER] FORGOT PASSWORD OK";
export const FORGOT_PASSWORD_NOT_OK = "[USER] FORGOT PASSWORD NOT OK";
/**
 * Set user data from Auth0 token data
 */
export function forgotPassword(email) {
  return dispatch =>
    LoginService.forgotPassword({
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
        if (error.response.status === 400 || error.response.status === 404) {
          dispatch(showMessage({ message: "Email ID not found in database " }));
        } else if (error.response.status === 500) {
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
    console.log(uidb64); //works
    console.log(token); //works
    LoginService.resetPassword({
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
        console.log(response.data.status);
        if (response.data.status === "Password Changed") {
          dispatch(showMessage({ message: "Password Changed Successfully " }));
        } else if (response.data.status === "Token Expired") {
          console.log(response);
          dispatch(showMessage({ message: "Token Expired" }));
        }
        return dispatch({
          type: FORGOT_PASSWORD_OK,
          status: response.status,
        });
      })
      .catch(error => {
        console.log(error);
        return dispatch({
          type: FORGOT_PASSWORD_NOT_OK,
          payload: error,
        });
      });
  };
}
export function setUserDataAuth0(tokenData) {
  const user = {
    role: ["CM"],
    from: "auth0",
    data: {
      displayName: tokenData.username,
      photoURL: tokenData.picture,
      email: tokenData.email,
      settings:
        tokenData.user_metadata && tokenData.user_metadata.settings
          ? tokenData.user_metadata.settings
          : {},
      shortcuts:
        tokenData.user_metadata && tokenData.user_metadata.shortcuts
          ? tokenData.user_metadata.shortcuts
          : [],
    },
  };

  return setUserData(user);
}

/**
 * Set User Data
 */
export function setUserData(user) {
  return dispatch => {
    /*
        You can redirect the logged-in user to a specific route depending on his role
         */

    history.location.state = {
      redirectUrl: "/example", // for example 'apps/academy'
    };

    /*
        Set User Settings
         */
    dispatch(FuseActions.setDefaultSettings(user.data.settings));

    /*
        Set User Data
         */
    dispatch({
      type: SET_USER_DATA,
      payload: user,
    });
  };
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
  return (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { settings } });

    updateUserData(user, dispatch);

    return dispatch(setUserData(user));
  };
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    updateUserData(newUser, dispatch);

    return dispatch(setUserData(newUser));
  };
}

/**
 * Remove User Data
 */
export function removeUserData() {
  return {
    type: REMOVE_USER_DATA,
  };
}

/**
 * Logout
 */
export function logoutUser() {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (!user.role || user.role.length === 0) {
      // is guest
      return null;
    }

    history.push({
      pathname: "/",
    });

    switch (user.from) {
      case "firebase": {
        break;
      }
      case "auth0": {
        break;
      }
      default: {
        //jwtService.logout();
      }
    }

    dispatch(FuseActions.setInitialSettings());

    return dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

/**
 * Update User Data
 */
function updateUserData(user, dispatch) {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  switch (user.from) {
    case "firebase": {
      break;
    }
    case "auth0": {
      break;
    }
    default: {
      // jwtService
      // 	.updateUserData(user)
      // 	.then(() => {
      // 		dispatch(MessageActions.showMessage({ message: "User data saved with api" }));
      // 	})
      // 	.catch((error) => {
      // 		dispatch(MessageActions.showMessage({ message: error.message }));
      // 	});
      break;
    }
  }
}
