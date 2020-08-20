import { authRoles } from "app/auth";
import { setIsAuth } from "app/auth/store/actions";
// import React from "react";
import history from "@history";
import logoutUser from "app/main/logout/index";
// import Login from "../login/Login";
// import { Redirect } from "react-router";

// import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
// import FuseSuspense from "@fuse/core/FuseSuspense";
// import LoginConfig from "app/main/login/LoginConfig";
const LogoutConfig = {
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/logout",
      component: () => {
        history.push("/#/login");
        logoutUser();
        setIsAuth(false);
        // return Login();
        //<Redirect to={"/login"} />
      },
    },
  ],
};

export default LogoutConfig;
