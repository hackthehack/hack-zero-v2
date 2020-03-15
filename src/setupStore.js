import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./store/reducers/authReducer";
import userReducer from "./store/reducers/userReducer";

import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
  //form: quizReducer
  // error: errorReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
