import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed useLocation
import { useDispatch, useSelector } from "react-redux";
import { login } from "stores/reducers/auth";
import { TextField, MenuItem, Select, FormControl } from "@mui/material";
import { useLocation } from "react-router-dom";

const Login = () => {
  const users = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [selectValue, setSelectValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(false);

  const options = Object.keys(users).map((user) => ({
    label: users[user].name,
    value: users[user].id,
  }));

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError(false);
    setPasswordValue(event.target.value);
  };

  const handleSubmit = () => {
    if (
      users &&
      users[selectValue] &&
      passwordValue === users[selectValue].password
    ) {
      dispatch(login(selectValue));
      navigate(state?.path || "/");
    } else {
      setError(true);
      alert("Wrong password");
    }
  };
  return (
    <div className="login-container">
      <h1>Employee Polls</h1>
      <img
        src={require("assets/img/Employee-Satisfaction-Survey.png")}
        alt=""
        className="login-img"
      ></img>
      <h2>Login</h2>
      <FormControl className="login-form">
        <h4 className="login-label">User</h4>
        <Select
          value={selectValue}
          onChange={handleSelectChange}
          displayEmpty
          sx={{
            width: "60%",
            margin: "10px 0px",
          }}
          size="small"
          defaultValue=""
        >
          {options &&
            options.map((option) => {
              return (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
        </Select>

        <h4 className="login-label">Password</h4>
        <TextField
          type="password"
          autoComplete="current-password"
          InputLabelProps={{ shrink: false }}
          size="small"
          sx={{
            width: "60%",
            margin: "10px 0px",
          }}
          value={passwordValue}
          onChange={handlePasswordChange}
          error={error}
          helperText={error && "Wrong password"}
        />
        <button className="login-btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </FormControl>
    </div>
  );
};

export default Login;
