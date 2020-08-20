import _ from "@lodash";

export const NumberTrayConfig = {
  icon: "dialpad",
  nodeType: "Number",
  primaryText: "Number",
  secondaryText: "Ask for Number",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
