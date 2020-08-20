export const OPEN_NODE_DETAIL = "[Builder] OPEN NODE DETAIL";
export const CLOSE_NODE_DETAIL = "[Builder] CLOSE NODE DETAIL";
export const SET_BOT_VARIABLE = "[Builder] BOT VARIABLE";
export const SAVE_NODE_PROPERTIES = "[Builder] SAVE NODE PROPERTIES";
export const DELETE_NODE = "[Builder] DELETE NODE";

export function setBotVariable() {
  return {
    type: SET_BOT_VARIABLE,
    cancel: true,
  };
}

export function setNodeProperties(obj) {
  return {
    type: SAVE_NODE_PROPERTIES,
    obj,
  };
}

export function deleteNode() {
  return {
    type: DELETE_NODE,
  };
}

export function showNodeDetails(obj) {
  return {
    type: OPEN_NODE_DETAIL,
    ...obj,
  };
}

export function closeNodeDetails() {
  return {
    type: CLOSE_NODE_DETAIL,
    cancel: true,
  };
}

export function saveNodeDetails(newObj) {
  return {
    type: CLOSE_NODE_DETAIL,
    newObj,
    save: true,
  };
}

export function cancelNodeDetails() {
  return {
    type: CLOSE_NODE_DETAIL,
    cancel: true,
  };
}
