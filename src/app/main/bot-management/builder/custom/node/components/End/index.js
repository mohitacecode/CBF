import _ from "@lodash";

export const EndTrayConfig = {
  icon: "pan_tool",
  nodeType: "END",
  primaryText: "End of the chat",
  messages: ["Bye"],
  message: true,
  portOpt: [{ linkType: "in", name: `in-${_.getUID()}`, in: true }],
};
