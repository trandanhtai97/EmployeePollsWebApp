import "./index.css";

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

export default LeaderboardHeader;
