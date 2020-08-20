import React from "react";

const ChatAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/admin_chat_area",
      component: React.lazy(() => import("./chat-inbox/AdminChatArea")),
    },
    {
      path: "/admin_chat_management",
      component: React.lazy(() => import("./chat-area-management/ChatAreaManage")),
    },
    {
      path: "/mychat_area",
      component: React.lazy(() => import("./my-chat-area/MyChatArea")),
    },
  ],
};

export const ChatAppNavConfig = {
  id: "chats",
  title: "Chats",
  translate: "Chats",
  type: "group",
  icon: "chat",
  children: [
    {
      id: "Chat_Area",
      title: "Chat Inbox",
      translate: "Chats",
      type: "item",
      icon: "chat",
      url: "/admin_chat_area",
    },
    {
      id: "Chat_Management",
      title: "Chat Management",
      translate: "Chat Management",
      type: "item",
      icon: "settings_applications",
      url: "/admin_chat_management",
    },
    {
      id: "My_Chat",
      title: "My Chat",
      translate: "My Chat Area",
      type: "item",
      icon: "assignment_ind",
      url: "/mychat_area",
    },
  ],
};

export default ChatAppConfig;
