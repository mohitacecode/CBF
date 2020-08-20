import { combineReducers } from "redux";
import nodeDetail from "./nodeDetail.reducers";
import nodeData from "./nodeData.reducers";
import stepper from "./stepper.reducers";

const reducer = combineReducers({
  nodeDetail,
  nodeData,
  stepper,
});

export default reducer;
