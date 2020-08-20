import React from "react";

export const TemplatesNavConfig = {
  id: "Templates",
  title: "Templates",
  translate: "Templates",
  type: "item",
  icon: "color_lens",
  url: "/templates",
};

const TemplatesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/templates",
      component: React.lazy(() => import("./Templates.js")),
    },
  ],
};

export default TemplatesConfig;
