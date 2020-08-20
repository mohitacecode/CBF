import _ from "@lodash";

export const MessageTrayConfig = {
  icon: "message",
  nodeType: "MESSAGE",
  primaryText: "Messages",
  secondaryText: "Messages",
  messages: [""],
  message: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
