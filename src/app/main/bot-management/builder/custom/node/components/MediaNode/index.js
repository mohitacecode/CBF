import _ from "@lodash";

export const MediaTrayConfig = {
  icon: "image",
  nodeType: "MEDIA",
  primaryText: "Media",
  secondaryText: "Display an Media in the Chat",
  questionText: "Media Caption",
  media_url: "",
  link_option: false,
  link: "",
  isUrlValid: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
