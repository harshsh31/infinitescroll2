import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers/rootReducer";

export function initializeStore(preloadedState = {}) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunkMiddleware),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
}
