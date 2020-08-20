import _ from "@lodash";

export const NameTrayConfig = {
  icon: "person",
  nodeType: "USERNAME",
  primaryText: "Name",
  secondaryText: "Ask for Name",
  questionText: "What's your Name?",
  userInput: true,
  fix_variable: true,
  variable: "@name",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
