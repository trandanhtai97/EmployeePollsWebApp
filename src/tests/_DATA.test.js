import { _saveQuestion, _saveQuestionAnswer } from "../data/_DATA";

describe("When I attempt to save a new question", () => {
  it("should return expected result given proper data", async () => {
    const poll = {
      optionOne: "test option one",
      optionTwo: "test option two",
      author: "sarahedo",
    };

    const result = await _saveQuestion(poll);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");
    expect(result).toHaveProperty("timestamp");
  });

  it("should return error given improper data", async () => {
    const malformedPoll = {
      optionOne: "test option one",
      optionTwo: "test option two",
    };

    await expect(_saveQuestion(malformedPoll)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("When I attempt to answer a poll", () => {
  it("should return true given proper data", async () => {
    const pollAnswer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(pollAnswer);

    expect(result).toEqual(true);
  });

  it("should return error given improper data", async () => {
    const malformedPollAnswer = {
      authedUser: "test option one",
      qid: "test option two",
    };

    await expect(_saveQuestionAnswer(malformedPollAnswer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
