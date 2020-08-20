import { combineReducers } from "redux";
import botList from "./listing.reducer";
import chatdata from "./chatdata.reducer";

const reducer = combineReducers({
  botList,
  chatdata,
});

export default reducer;
