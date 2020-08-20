import React from "react";
const ProfileConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/profile",
      component: React.lazy(() => import("./Profile")),
    },
    {
      path: "/changePassword",
      component: React.lazy(() => import("./ChangePass")),
    },
  ],
};

export default ProfileConfig;
