import "./index.css";

const LeaderboardChild = (props) => {
  return (
    <>
      {props.userList.map(({ id, name, questions, answers }) => (
        <tr className="leaderboard-body" key={id}>
          <td className="leaderboard-item">{name}</td>
          <td className="leaderboard-item">{Object.keys(answers).length}</td>
          <td className="leaderboard-item">{questions.length}</td>
        </tr>
      ))}
    </>
  );
};

export default LeaderboardChild;
