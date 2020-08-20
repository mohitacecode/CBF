import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const statListStore = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default statListStore;
