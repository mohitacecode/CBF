import { combineReducers } from "redux";
import settings from "app/store/reducers/fuse/settings.reducer";

const fuseReducers = combineReducers({
  settings,
});

export default fuseReducers;
