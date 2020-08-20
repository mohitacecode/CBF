import React from "react";

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/example",
      component: React.lazy(() => import("./Example")),
    },
  ],
};

export const ExampleNavConfig = {
  id: "example",
  title: "Example",
  translate: "EXAMPLE",
  type: "item",
  icon: "whatshot",
  url: "/example",
};

export default ExampleConfig;
