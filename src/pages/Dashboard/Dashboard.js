import { useSelector } from "react-redux";
import { useState } from "react";
import Header from "components/Header/Header";
import PollGroup from "components/PollGroup/PollGroup";
import "./index.css";

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

  const answeredPolls = pollsArray.filter(
    (poll) =>
      poll.optionOne.votes.includes(authUser) ||
      poll.optionTwo.votes.includes(authUser)
  );

  const unansweredPolls = pollsArray.filter(
    (poll) =>
      !poll.optionOne.votes.includes(authUser) &&
      !poll.optionTwo.votes.includes(authUser)
  );

  return (
    <>
      <Header index={1}></Header>
      <h1>Welcome {authUser}</h1>
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

      {isToggle ? (
        <PollGroup
          key="new"
          label={"New Questions"}
          questions={unansweredPolls}
          data-testid="unansweredPolls"
        ></PollGroup>
      ) : (
        <PollGroup
          key="answered"
          label={"Done"}
          questions={answeredPolls}
          data-testid="answeredPolls"
        ></PollGroup>
      )}
    </>
  );
};

export default Dashboard;