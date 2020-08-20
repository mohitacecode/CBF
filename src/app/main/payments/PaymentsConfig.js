import React from "react";

export const PaymentsNavConfig = {
  id: "Payments",
  title: "Payments",
  translate: "Payments",
  type: "item",
  icon: "payment",
  url: "/payments",
};

const PaymentsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/payments",
      component: React.lazy(() => import("./Payments.js")),
    },
  ],
};

export default PaymentsConfig;
