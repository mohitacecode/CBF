import { combineReducers } from "redux";
import profileReducer from "./profile.reducer";
import passwordReducer from "./changepass.reducer";
const reducer = combineReducers({
  profileReducer,
  passwordReducer,
});

export default reducer;
