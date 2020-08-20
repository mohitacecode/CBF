import _ from "@lodash";

export const CallUsConfig = {
  icon: "call",
  nodeType: "CallUs",
  primaryText: "Call Us",
  secondaryText: "Choices Based on Buttons",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
