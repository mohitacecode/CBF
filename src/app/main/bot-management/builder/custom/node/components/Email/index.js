import _ from "@lodash";

export const EmailTrayConfig = {
  icon: "email",
  nodeType: "EMAIL",
  primaryText: "Email",
  secondaryText: "Ask for the user email",
  questionText: "What's your email?",
  userInput: true,
  fix_variable: true,
  variable: "@email",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
