import _ from "@lodash";

export const CheckBoxTrayConfig = {
  icon: "check_box",
  nodeType: "MULTIPLE_CHECK_BOX",
  primaryText: "Multiple Check Box",
  secondaryText: "Give Multiple Choices",
  questionText: "Select the Option of Your Interest",
  choices: ["option 1", "option 2", "option 3"],
  userInput: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
