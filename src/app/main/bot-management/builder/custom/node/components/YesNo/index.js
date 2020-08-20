import _ from "@lodash";

export const YesNoTrayConfig = {
  icon: "call_split",
  nodeType: "YES_NO",
  primaryText: "Yes/No",
  secondaryText: "Make a yes/no choice",
  questionText: "What's your choice?",
  userInput: true,
  multiple: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    {
      linkType: "out",
      componentProps: { type: "Button", text: "Yes" },
      name: `out-${_.getUID()}`,
      in: false,
    },
    {
      linkType: "out",
      componentProps: { type: "Button", text: "No" },
      name: `out-${_.getUID()}`,
      in: false,
    },
  ],
};
