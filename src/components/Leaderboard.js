import Header from "actions/Header";
import { useSelector } from "react-redux";

const LeaderboardHeader = (props) => {
  return (
    <>
      <thead>
        <tr className="leaderboard-head">
          <th className="leaderboard-item">Users</th>
          <th className="leaderboard-item">Answered</th>
          <th className="leaderboard-item">Created</th>
        </tr>
      </thead>
    </>
  );
};

const LeaderboardChild = (props) => {
  return (
    <>
      {props.userList.map(({ id, name, questions, answers }) => (
        <tr className="leaderboard-body" key={id}>
          <td className="leaderboard-item">{name}</td>
          <td className="leaderboard-item">{Object.keys(answers).length}</td>
          <td className="leaderboard-item">{Object.keys(questions).length}</td>
        </tr>
      ))}
    </>
  );
};
const Leaderboard = () => {
  const users = useSelector((state) => state.users.value);

  const userList = Object.values(users).map((user) => ({ ...user }));

  userList.sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  );

  return (
    <>
      <Header index={2}></Header>
      <div className="leaderboard">
        <table className="leaderboard-table">
          <LeaderboardHeader />
          <tbody>
            <LeaderboardChild userList={userList} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
