import _ from "@lodash";

export const InitTrayConfig = {
  icon: "flag",
  nodeType: "INIT",
  primaryText: "Welcome",
  secondaryText: "Start of the flow",
  messages: ["Hi there!"],
  message: true,
  portOpt: [{ linkType: "out", name: `out-${_.getUID()}`, in: false }],
};
