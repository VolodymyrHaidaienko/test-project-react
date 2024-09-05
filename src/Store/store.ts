import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
