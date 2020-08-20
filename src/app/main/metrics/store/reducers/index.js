import { combineReducers } from "redux";
import metrics from "./metrics.reducers";

const reducer = combineReducers({
  metrics,
});

export default reducer;
