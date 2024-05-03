import "./index.css";
import Poll from "components/Poll/Poll";

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

export default PollGroup;
