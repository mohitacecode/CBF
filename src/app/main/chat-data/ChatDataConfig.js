import React from "react";
import withTracher from "withTracker";

export const ChatDataNavConfig = {
  id: "chatData",
  title: "Chat Data",
  translate: "Chat Data",
  type: "item",
  icon: "chat_bubble_outline",
  url: "/chatData",
};

const ChatDataConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/chatData",
      component: withTracher(React.lazy(() => import("./ChatData"))),
    },
  ],
};

export default ChatDataConfig;
