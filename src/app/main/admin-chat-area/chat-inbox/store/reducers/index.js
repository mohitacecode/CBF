import { combineReducers } from "redux";
import chatData from "./messages.reducer";
import contact from "./contact.reducer";

const messageStore = combineReducers({
  chatData,
  contact,
});

export default messageStore;
