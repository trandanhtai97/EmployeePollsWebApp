import Header from "components/Header/Header";
import "./index.css";
import { useSelector } from "react-redux";

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
          <thead>
            <tr className="leaderboard-head">
              <th className="leaderboard-item">Users</th>
              <th className="leaderboard-item">Answered</th>
              <th className="leaderboard-item">Created</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(({ id, name, questions, answers }) => (
              <tr className="leaderboard-body" key={id}>
                <td className="leaderboard-item">{name}</td>
                <td className="leaderboard-item">
                  {Object.keys(answers).length}
                </td>
                <td className="leaderboard-item">{questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
