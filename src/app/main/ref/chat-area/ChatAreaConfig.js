import React from "react";

const ChatAreaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/chatbox",
      component: React.lazy(() => import("./ChatArea")),
    },
  ],
};

export const ChatAreaNavConfig = {
  id: "Chat_Area",
  title: "Chat",
  translate: "Chat",
  type: "item",
  icon: "chat",
  url: "/chatbox",
};

export default ChatAreaConfig;
