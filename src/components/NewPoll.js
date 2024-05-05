import Header from "actions/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { create } from "reduces/polls";
import { fetchUser } from "reduces/users";

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

const SecondOption = () => {
  return (
    <>
      <div className="create-poll-item">
        <label className="create-poll-label">Second Option</label>
        <input className="create-poll-input" placeholder="Option Two"></input>
      </div>
    </>
  );
};

const NewPoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.value);

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      create({
        optionOne: event.target[0].value,
        optionTwo: event.target[1].value,
        author: authUser,
      })
    );
    dispatch(fetchUser());
    navigate("/");
  };
  return (
    <>
      <Header index={3}></Header>
      <div className="create-poll">
        <h1>Would You Rather</h1>
        <div>Create Your Poll</div>
        <form className="create-poll-form" onSubmit={submit}>
          <FirstOption />
          <SecondOption />

          <button type="submit" className="create-poll-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPoll;
