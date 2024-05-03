import "./index.css";

const FirstOption = () => {
  return (
    <>
      <div className="create-poll-item">
        <label className="create-poll-label">First Option</label>
        <input
          className="create-poll-input"
          type="text"
          placeholder="Option One"
        ></input>
      </div>
    </>
  );
};

export default FirstOption;
