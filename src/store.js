import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reduces/authed";
import { pollSlice } from "./reduces/polls";
import { userSlice } from "./reduces/users";

export const store = configureStore({
  reducer: {
    authUser: authSlice.reducer,
    polls: pollSlice.reducer,
    users: userSlice.reducer,
  },
});
