import { useSelector } from "react-redux";
import { useState } from "react";
import Header from "actions/Header";
import { Link } from "react-router-dom";

const Poll = ({ id, user, date }) => {
  return (
    <div className="poll">
      <div className="poll-item-top">
        <div className="poll-item-top-user">{user}</div>
        <div className="poll-item-top-date">{date}</div>
      </div>
      <div className="poll-item-bottom">
        <Link className="poll-btn" to={`/question/${id}`}>
          Show
        </Link>
      </div>
    </div>
  );
};

const PollGroup = ({ label, questions }) => {
  const listQuestion = questions.map((question) => {
    const questionDate = new Date(question?.timestamp);
    return (
      <Poll
        key={question.id}
        id={question.id}
        user={question.author}
        date={`${questionDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })} | ${questionDate.getMonth()}/${questionDate.getDate()}/${questionDate.getFullYear()}`}
      ></Poll>
    );
  });
  return (
    <>
      <div className="group-poll">
        <div className="group-poll-left"></div>
        <div className="group-poll-center">
          <div className="group-poll-label">{label}</div>
          <div className="polls">{listQuestion}</div>
        </div>
        <div className="group-poll-right"></div>
      </div>
    </>
  );
};
const Tab = (props) => {
  const { toggleChange, isToggle } = props;

  return (
    <>
      <div className="nav-bar-left ">
        <div
          className={`nav-bar-item ${isToggle && "nav-bar-item-active"}`}
          onClick={toggleChange}
          data-testid="unansweredTab"
        >
          New Questions
        </div>
        <div
          className={`nav-bar-item ${!isToggle && "nav-bar-item-active"}`}
          onClick={toggleChange}
          data-testid="answeredTab"
        >
          Done
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const authUser = useSelector((state) => state.authUser.value);
  const polls = useSelector((state) => state.polls.value);
  const [isToggle, setIsToggle] = useState(true);

  const toggleChange = () => {
    setIsToggle(!isToggle);
  };

  const pollsArray = Object.keys(polls)
    .map((id) => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const pollAnswered = pollsArray.filter(
    (poll) =>
      poll.optionOne.votes.includes(authUser) ||
      poll.optionTwo.votes.includes(authUser)
  );

  const PollNotAnswered = pollsArray.filter(
    (poll) =>
      !poll.optionOne.votes.includes(authUser) &&
      !poll.optionTwo.votes.includes(authUser)
  );

  const content = isToggle ? (
    <PollGroup
      key="new"
      label={"New Questions"}
      questions={PollNotAnswered}
      data-testid="PollsNotAnswered"
    ></PollGroup>
  ) : (
    <PollGroup
      key="answered"
      label={"Done"}
      questions={pollAnswered}
      data-testid="pollAnswered"
    ></PollGroup>
  );

  return (
    <>
      <Header index={1}></Header>
      <h1>Welcome {authUser}</h1>
      <Tab toggleChange={toggleChange} isToggle={isToggle} />
      {content}
    </>
  );
};

export default Dashboard;
