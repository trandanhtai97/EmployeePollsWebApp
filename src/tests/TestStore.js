import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "reduces/authed";
import { pollSlice } from "reduces/polls";
import { userSlice } from "reduces/users";

export default function testStore(preloadedState = {}) {
  const createStore = configureStore({
    reducer: {
      authUser: authSlice.reducer,
      polls: pollSlice.reducer,
      users: userSlice.reducer,
    },
    preloadedState,
  });

  return createStore;
}
