import Header from "components/Header";
import "./index.css";
import { useSelector } from "react-redux";
import LeaderboardChild from "./LeaderboardChild";
import LeaderboardHeader from "./LeaderboardHeader";

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
