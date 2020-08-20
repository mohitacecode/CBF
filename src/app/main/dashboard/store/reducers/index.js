import { combineReducers } from "redux";
import operator from "./operator.reducer";
import operators_list from "./operators_list.reducer";
import teams from "./teams.reducer";

const reducer = combineReducers({
  operators_list,
  operator,
  teams,
});

export default reducer;
