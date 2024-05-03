import Header from "components/Header";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPoll } from "stores/reducers/polls";
import { fetchUsers } from "stores/reducers/users";
import FirstOption from "./firstOption";
import SecondOption from "./sencondOption";

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createPoll({
        optionOneText: event.target[0].value,
        optionTwoText: event.target[1].value,
        author: authUser,
      })
    );
    dispatch(fetchUsers());
    navigate("/");
  };
  return (
    <>
      <Header index={3}></Header>
      <div className="create-poll">
        <h1>Would You Rather</h1>
        <div>Create Your Own Poll</div>
        <form className="create-poll-form" onSubmit={handleSubmit}>
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

export default CreatePoll;
