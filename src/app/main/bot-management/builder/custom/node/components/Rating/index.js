import _ from "@lodash";

// export const RatingTrayConfig = {
// 	icon: "star_rate",
// 	nodeType: "MultipleChoice",
// 	primaryText: "Rating",
// 	secondaryText: "Create a evaluation",
// 	portOpt: [
// 		{ linkType: "in", name: `in-${_.getUID()}`, in: true },
// 		{ linkType: "out", componentProps: { type: "Button", text: "Test" }, name: `out-${_.getUID()}`, in: false },
// 		{ linkType: "out", componentProps: { type: "Button", text: "Xyz" }, name: `out-${_.getUID()}`, in: false }
// 	]
// };

export const RatingTrayConfig = {
  icon: "sentiment_very_satisfied",
  nodeType: "RATING",
  primaryText: "Rating & Feedback",
  secondaryText: "Create a evaluation",
  questionText: "Please rate this chat and provide necessary feedback",
  rating_type: "emoji",
  rating_max: 5,
  feedback_input: false,
  userInput: true,
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
