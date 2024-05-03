import "./index.css";

const AnsweredPoll = ({
  optionSelectedByUser,
  poll,
  percentageOptionOne,
  optionOneVotes,
  percentageOptionTwo,
  optionTwoVotes,
  handleBack,
}) => {
  return (
    <>
      <div className="answered-poll">
        <div>
          <h3>{poll?.optionOne.text}</h3>
          <div>
            {optionOneVotes} votes for this option! {percentageOptionOne}% of
            the votes!
          </div>
          <h4>
            {optionSelectedByUser === "optionOne" &&
              "You voted for this option!"}
          </h4>
        </div>

        <div>
          <h3>{poll?.optionTwo.text}</h3>
          <div>
            {optionTwoVotes} votes for this option! {percentageOptionTwo}% of
            the votes!
          </div>
          <h4>
            {optionSelectedByUser === "optionTwo" &&
              "You voted for this option!"}
          </h4>
        </div>
      </div>
      <button onClick={handleBack} className="btn-back">
        Go Back to Home
      </button>
    </>
  );
};

export default AnsweredPoll;
