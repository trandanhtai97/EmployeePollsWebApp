import "./index.css";

const AnswerPoll = ({ handlePollVote, poll }) => {
  return (
    <div className="answer-poll">
      <h2>Would You Rather</h2>
      <div className="answer-poll-group">
        <button
          className="answer-poll-option answer-poll-option-one"
          onClick={handlePollVote}
          id="optionOne"
        >
          {poll?.optionOne.text}
        </button>
        <button
          className="answer-poll-option"
          onClick={handlePollVote}
          id="optionTwo"
        >
          {poll?.optionTwo.text}
        </button>
      </div>
    </div>
  );
};

export default AnswerPoll;
