import React from "react";

export const BotListNavConfig = {
  id: "botList",
  title: "Bots List",
  translate: "Bots List",
  type: "item",
  icon: "adb",
  url: "/botList",
};

const BotListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/botList",
      component: React.lazy(() => import("./BotList")),
    },
  ],
};

export default BotListConfig;
