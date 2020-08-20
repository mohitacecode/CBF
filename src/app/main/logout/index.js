import store from "app/store";
import * as authActions from "app/auth/store/actions";
//import history from "@history";
export default function logoutUser() {
  store.dispatch(authActions.logoutUser());
  //history.push("/#/botList");
}
