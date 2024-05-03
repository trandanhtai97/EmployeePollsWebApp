import "./index.css";

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

export default Tab;
