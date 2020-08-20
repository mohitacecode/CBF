import _ from "@lodash";

export const AgentTransferTrayConfig = {
  icon: "camera_front",
  nodeType: "AGENT_TRANSFER",
  primaryText: "Agent Takeover",
  secondaryText: "Tranfer Control to Agent",
  messages: ["Connecting You to Agent"],
  message: true,
  userInput: true,
  portOpt: [{ linkType: "in", name: `in-${_.getUID()}`, in: true }],
};
