import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { pollsSlice } from "./reducers/polls";
import { usersSlice } from "./reducers/users";

export const store = configureStore({
  reducer: {
    authUser: authSlice.reducer,
    polls: pollsSlice.reducer,
    users: usersSlice.reducer,
  },
});
