import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

// Async Thunks
export const logoutThunk = createAsyncThunk(
  "logout",
  async (_, { dispatch }) => {
    dispatch(logout());
    window.location.href = "/"; // Navigate to home page
  }
);

// Slice
export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
