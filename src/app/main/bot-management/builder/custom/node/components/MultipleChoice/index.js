import _ from "@lodash";

export const MultipleChoiceTrayConfig = {
  icon: "playlist_add_check",
  nodeType: "MULTI_CHOICE",
  primaryText: "Multiple Choice",
  secondaryText: "Make multiple choices",
  questionText: "What's your choice?",
  userInput: true,
  multiple: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    {
      linkType: "out",
      componentProps: { type: "Button", text: "" },
      name: `out-${_.getUID()}`,
      in: false,
    },
  ],
};
