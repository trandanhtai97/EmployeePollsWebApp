import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "data/_DATA";

// Async Thunks
export const fetchUsers = createAsyncThunk("users/fetch", _getUsers);

export const updateQuestionAsked = createAsyncThunk(
  "users/update",
  async (payload, { dispatch }) => {
    dispatch(usersSlice.actions.updateQuestionsAsked(payload));
    return _getUsers();
  }
);

// Slice
export const usersSlice = createSlice({
  name: "users",
  initialState: { value: {} },
  reducers: {
    updateQuestionsAnswered: (
      state,
      { payload: { authedUser, qid, answer } }
    ) => {
      state.value[authedUser].answers[qid] = answer;
    },
    updateQuestionsAsked: (state, { payload: { author, id } }) => {
      state.value[author].questions.push(id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
  },
});

export const { updateQuestionsAnswered, updateQuestionsAsked } =
  usersSlice.actions;
export default usersSlice.reducer;
