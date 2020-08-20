import React from "react";

export const DashboardNavConfig = {
  id: "Dashboard",
  title: "Dashboard",
  translate: "Dashboard",
  type: "item",
  icon: "dashboard",
  url: "/dashboard",
};

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/dashboard",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};

export default DashboardConfig;
