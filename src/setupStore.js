import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./store/reducers/authReducer";
import userReducer from "./store/reducers/userReducer";
import hackReducer from "./store/reducers/hackathonReducer";
import { uploadReducer } from "./store/reducers/uploadReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const persistConfig = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: userReducer,
  hack: hackReducer,
  upload: uploadReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;