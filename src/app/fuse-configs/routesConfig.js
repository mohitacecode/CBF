import React from "react";
import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
//import store from "app/store";
import routeConfigs, { simpleLoginRoutes } from "app/router";

//console.log(store.getState().auth.user.permissionRoutes);

export const unAuthenticatedRoute = [
  //...FuseUtils.generateRoutesFromConfigs(routeConfigs, ["admin", "Operator"]),
  ...FuseUtils.generateRoutesFromConfigs(simpleLoginRoutes),
  {
    path: "/",
    component: () => <Redirect to="/login" />,
  },
  {
    component: () => <Redirect to="/error-404" />,
  },
];

const routes = [
  //...FuseUtils.generateRoutesFromConfigs(routeConfigs, ["admin", "Operator"]),
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/botList" />,
  },
  {
    component: () => <Redirect to="/error-404" />,
  },
];
export const getPermittedRoutes = store => {
  //if not authenticated than send "unAuthenticatedRoute"
  // else add logic to filter route based on Store
  console.log(store.getState().auth.user.isAuthenticate);
  if (store.getState().auth.user.isAuthenticate) {
    return routes; //[
    // 	//...FuseUtils.generateRoutesFromConfigs(routeConfigs, ["admin", "Operator"]),
    // 	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    // 	{
    // 		path: "/",
    // 		component: () => <Redirect to="/botList" />
    // 	},
    // 	{
    // 		component: () => <Redirect to="/error-404" />
    // 	}
    // ];
  } else return unAuthenticatedRoute;
};

export default routes;
