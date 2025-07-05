"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import organizationReducer from "./feature/organizationSlice";
import tokenReducer from "./feature/tokenSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    organizations: organizationReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
