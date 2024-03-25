import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import app from "./app";
import user from "./user";


const reducer = combineReducers({
  app,
  user
});

const store = configureStore({
  reducer,
});
export default store;
