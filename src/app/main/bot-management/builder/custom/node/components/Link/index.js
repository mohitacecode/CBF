import _ from "@lodash";

export const LinkTrayConfig = {
  icon: "link",
  nodeType: "LINK",
  primaryText: "Link URL",
  secondaryText: "Redirect to Specified Link",
  questionText: "click the URL below",
  urlMessage: "https://www.google.com",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
