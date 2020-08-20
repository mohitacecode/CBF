import _ from "@lodash";

export const AddressTrayConfig = {
  icon: "location_on",
  nodeType: "ADDRESS",
  primaryText: "Address",
  secondaryText: "Ask for Address",
  questionText: "Enter permanent address?",
  userInput: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
