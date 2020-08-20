import _ from "@lodash";

export const ImageTrayConfig = {
  icon: "image",
  primaryText: "Image",
  nodeType: "Image",
  secondaryText: "Choices Based on Buttons",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
