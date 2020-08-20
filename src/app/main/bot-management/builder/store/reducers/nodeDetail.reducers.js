import * as Actions from "../actions";

const initialState = {
  node: {},
  afterSave: null,
  open: false,
};

const nodeDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.OPEN_NODE_DETAIL: {
      return {
        ...state,
        open: true,
        node: action.node,
        cancel: action.cancel,
        afterSave: action.afterSave,
      };
    }
    case Actions.SAVE_NODE_PROPERTIES: {
      return {
        ...state,
        node: { ...state.node, options: { ...state.node.options, ...action.obj } },
      };
    }
    case Actions.DELETE_NODE: {
      return {
        node: {},
        afterSave: null,
        open: false,
      };
    }
    case Actions.CLOSE_NODE_DETAIL: {
      if (action.save && state.afterSave) {
        state.afterSave(action.newObj);
      } else if (action.cancel && state.cancel) {
        state.cancel();
      }
      return {
        ...state,
        open: false,
        afterSave: null,
        node: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default nodeDetailsReducer;
