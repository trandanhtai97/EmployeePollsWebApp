import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="not-found">
        <h1>404 Error Page</h1>
        <p>The page does not exist</p>
        <button onClick={handleClick}>Go to Home</button>
      </div>
    </>
  );
};

export default NotFound;
