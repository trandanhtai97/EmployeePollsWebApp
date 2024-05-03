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
      <Button variant="danger" type="submit" onClick={handleClick}>
        Go to Home
      </Button>
      </div>
    </>
  );
};

export default NotFound;
