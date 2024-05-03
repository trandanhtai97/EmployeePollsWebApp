import "./index.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Employee Polls</h1>
      <img
        src={require("assets/img/Employee-Satisfaction-Survey.png")}
        alt=""
        className="login-img"
      ></img>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
