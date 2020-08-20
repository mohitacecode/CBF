import React from "react";
const AdminConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/operatorform/:id?",
      component: React.lazy(() => import("./admin-owner/components/Operator-Form")),
    },
    {
      path: "/operator_dashboard/view",
      component: React.lazy(() => import("./admin-operator/Operator")),
    },
    {
      path: "/operatorform/new",
      component: React.lazy(() => import("./admin-owner/components/Operator-Form")),
    },
    {
      path: "/operators",
      component: React.lazy(() => import("./admin-owner/OperatorsList")),
    },
    {
      path: "/teams",
      component: React.lazy(() => import("./teams/TeamList")),
    },
  ],
};

export const AdminNavConfig = {
  id: "Admins",
  title: "Operators",
  translate: "Operators",
  type: "group",
  icon: "people",
  children: [
    {
      id: "Admins",
      title: "Operators",
      translate: "Operators",
      type: "item",
      icon: "people",
      url: "/operators",
    },
    {
      id: "Teams",
      title: "Teams",
      translate: "Teams",
      type: "item",
      icon: "group",
      url: "/teams",
    },
  ],
};

export default AdminConfig;
