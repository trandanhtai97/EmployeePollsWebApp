import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "data/_DATA";

export const fetchUser = createAsyncThunk("users/fetch", _getUsers);

export const updateQuestion = createAsyncThunk(
  "users/update",
  async (payload, { dispatch }) => {
    dispatch(userSlice.actions.updateQuestionsAsked(payload));
    return _getUsers();
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: { value: {} },
  reducers: {
    questionAns: (
      state,
      { payload: { authedUser, qid, answer } }
    ) => {
      state.value[authedUser].answers[qid] = answer;
    },
    questionAsk: (state, { payload: { author, id } }) => {
      state.value[author].questions.push(id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
  },
});

export const { questionAns, questionAsk } =
userSlice.actions;
export default userSlice.reducer;
