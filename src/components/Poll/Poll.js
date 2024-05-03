import "./index.css";
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

export default Poll;
