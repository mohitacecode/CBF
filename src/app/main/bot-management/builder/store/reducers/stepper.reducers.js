import * as Actions from "../actions";

const initialState = {
  activeStep: 0,
};

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ACTIVE_STEP: {
      return {
        ...state,
        activeStep: action.step,
      };
    }
    default: {
      return state;
    }
  }
};

export default stepperReducer;
