import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "components/NotFound";
import { pollAns } from "reduces/polls";
import Header from "actions/Header";
import { useState, useEffect } from "react";
import { questionAns } from "reduces/users";

const PollQuestion = ({
  selectedByUser,
  poll,
  percentOptionOne,
  optionOneVotes,
  percentOptionTwo,
  optionTwoVotes,
  back,
}) => {
  return (
    <>
      <div className="answered-poll">
        <div>
          <h3>{poll?.optionOne.text}</h3>
          <div>
            {optionOneVotes} votes for this option! {percentOptionOne}% of
            the votes!
          </div>
          <h4>
            {selectedByUser === "optionOne" &&
              "You voted this option!"}
          </h4>
        </div>

        <div>
          <h3>{poll?.optionTwo.text}</h3>
          <div>
            {optionTwoVotes} votes for this option! {percentOptionTwo}% of
            the votes!
          </div>
          <h4>
            {selectedByUser === "optionTwo" &&
              "You voted this option!"}
          </h4>
        </div>
      </div>
      <button onClick={back} className="btn-back">
        Go Back to Home
      </button>
    </>
  );
};

const PollAnswer = ({ pollVote, poll }) => {
  return (
    <div className="answer-poll">
      <h2>Would You Rather</h2>
      <div className="answer-poll-group">
        <button
          className="answer-poll-option answer-poll-option-one"
          onClick={pollVote}
          id="optionOne"
        >
          {poll?.optionOne.text}
        </button>
        <button
          className="answer-poll-option"
          onClick={pollVote}
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
  const selectByUser = user[authUser].answers[id];

  const authedUserAnswers = user[authUser].answers;

  useEffect(() => {
    const loggedIn = Object.keys(authedUserAnswers)
      .filter((answer) => {
        return answer === id;
      })
      .map((answer) => {
        return authedUserAnswers[answer];
      });
    if (loggedIn.length > 0) {
      setAnswered(true);
    }
  }, [authUser, authedUserAnswers, id]);

  const pollVote = (event) => {
    const answer = event.currentTarget.id;
    const payload = { authedUser: authUser, qid: id, answer };
    dispatch(pollAns(payload));
    dispatch(questionAns(payload));
  };

  const backHome = () => {
    navigate("/");
  };

  const percent = (votes, total) => {
    return Math.floor((votes / total) * 100);
  };

  const percentOptionOne = percent(optionOneVotes, votesTotal);
  const percentOptionTwo = percent(optionTwoVotes, votesTotal);

  const content = answered ? (
    <PollQuestion
      selectedByUser={selectByUser}
      poll={poll}
      percentOptionOne={percentOptionOne}
      optionOneVotes={optionOneVotes}
      percentOptionTwo={percentOptionTwo}
      optionTwoVotes={optionTwoVotes}
      back={backHome}
    ></PollQuestion>
  ) : (
    <PollAnswer poll={poll} pollVote={pollVote}></PollAnswer>
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
