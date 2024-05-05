import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "data/_DATA";

export const fetchPoll = createAsyncThunk("polls/fetch", _getQuestions);

export const create = createAsyncThunk(
  "polls/create",
  async (formValues) => {
    await _saveQuestion(formValues);
    return _getQuestions();
  }
);

export const pollSlice = createSlice({
  name: "polls",
  initialState: { value: {} },
  reducers: {
    pollAns: (state, { payload: { authedUser, qid, answer } }) => {
      state.value[qid][answer].votes.push(authedUser);
      _saveQuestionAnswer({ authedUser, qid, answer });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoll.fulfilled, (state, { payload }) => {
        state.value = payload;
      })
      .addCase(create.fulfilled, (state, { payload }) => {
        state.value = payload;
      });
  },
});

export const { pollAns } = pollSlice.actions;
export default pollSlice.reducer;
