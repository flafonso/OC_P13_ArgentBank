import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authenticationSlice from "../features/authentication/authenticationSlice";

const state = {};

export const store = configureStore(
  {
    preloadedState: state,
    reducer: combineReducers({
      auth: authenticationSlice.reducer,
    })
  }
);
