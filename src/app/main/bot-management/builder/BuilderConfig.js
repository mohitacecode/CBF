import React from "react";

const BuilderConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/builder/:id",
      exact: true,
      component: React.lazy(() => import("./Builder")),
    },
  ],
};

export default BuilderConfig;
