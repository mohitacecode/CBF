import { combineReducers } from "redux";
import channelReducer from "./channelform.reducer";
import channel_listReducer from "./channels_list.reducer";
import accountReducer from "./businessform.reducer";
import account_listReducer from "./business_list.reducer";
import templates from "./templates.reducer";
const reducer = combineReducers({
  channelReducer,
  channel_listReducer,
  accountReducer,
  account_listReducer,
  templates,
});

export default reducer;
