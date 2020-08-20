import _ from "@lodash";

export const DateTrayConfig = {
  icon: "date_range",
  nodeType: "DATE",
  primaryText: "Date",
  secondaryText: "Ask for Date",
  questionText: "Select a Date, please",
  dateFormat: "DD-MM-YYYY",
  userInput: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
