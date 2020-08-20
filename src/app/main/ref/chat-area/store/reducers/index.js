import { combineReducers } from "redux";
import chatData from "./messages.reducer.js";

const messageStore = combineReducers({
  chatData,
});

export default messageStore;
