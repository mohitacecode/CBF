import _ from "@lodash";

export const PhoneTrayConfig = {
  icon: "dialpad",
  nodeType: "PHONE",
  primaryText: "Phone number",
  secondaryText: "Ask for Phone number",
  questionText: "What's your phone number?",
  userInput: true,
  fix_variable: true,
  variable: "@phone",
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
