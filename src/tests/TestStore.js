import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "stores/reducers/auth";
import { pollsSlice } from "stores/reducers/polls";
import { usersSlice } from "stores/reducers/users";

export default function createTestStore(preloadedState = {}) {
  const createStore = configureStore({
    reducer: {
      authUser: authSlice.reducer,
      polls: pollsSlice.reducer,
      users: usersSlice.reducer,
    },
    preloadedState,
  });

  return createStore;
}
