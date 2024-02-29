import { createStore, combineReducers, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
//import rootReducer from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer,
});

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cart items")
      ? JSON.parse(localStorage.getItem("cart items"))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
