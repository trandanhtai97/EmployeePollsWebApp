import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "components/NotFound";
import { recordPollAnswer } from "reduces/polls";
import { updateQuestionsAnswered } from "reduces/users";
import Header from "actions/Header";
import { useState, useEffect } from "react";

const PollQuestion = ({
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

const PollAnswer = ({ handlePollVote, poll }) => {
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


const PollDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const polls = useSelector((state) => state.polls.value);
  const poll = polls[id] ? polls[id] : undefined;

  const authUser = useSelector((state) => state.authUser.value);
  const dispatch = useDispatch();
  const [answered, setAnswered] = useState(false);
  const optionOneVotes = poll?.optionOne.votes.length;
  const optionTwoVotes = poll?.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;

  const user = useSelector((state) => state.users.value);
  const optionSelectedByUser = user[authUser].answers[id];

  const authedUserAnswers = user[authUser].answers;

  useEffect(() => {
    const loggedInAnswer = Object.keys(authedUserAnswers)
      .filter((answer) => {
        return answer === id;
      })
      .map((answer) => {
        return authedUserAnswers[answer];
      });
    if (loggedInAnswer.length > 0) {
      setAnswered(true);
    }
  }, [authUser, authedUserAnswers, id]);

  const handlePollVote = (event) => {
    const answer = event.currentTarget.id;
    const payload = { authedUser: authUser, qid: id, answer };
    dispatch(recordPollAnswer(payload));
    dispatch(updateQuestionsAnswered(payload));
  };

  const handleBack = () => {
    navigate("/");
  };

  const calculatePercentage = (votes, total) => {
    return Math.floor((votes / total) * 100);
  };

  const percentageOptionOne = calculatePercentage(optionOneVotes, votesTotal);
  const percentageOptionTwo = calculatePercentage(optionTwoVotes, votesTotal);

  const content = answered ? (
    <PollQuestion
      optionSelectedByUser={optionSelectedByUser}
      poll={poll}
      percentageOptionOne={percentageOptionOne}
      optionOneVotes={optionOneVotes}
      percentageOptionTwo={percentageOptionTwo}
      optionTwoVotes={optionTwoVotes}
      handleBack={handleBack}
    ></PollQuestion>
  ) : (
    <PollAnswer poll={poll} handlePollVote={handlePollVote}></PollAnswer>
  );

  if (poll === undefined) {
    return <NotFound />;
  }

  return (
    <>
      <Header></Header>
      <div className="poll-detail">
        <div>
          <h1>Poll by {poll?.author}</h1>
        </div>
        {content}
      </div>
    </>
  );
};

export default PollDetail;
