import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "reduces/authed";
import { useDispatch } from "react-redux";

const Header = ({ index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.value);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(index);
  }, [index]);

  const clickTab = (event, tabIndex) => {
    event.preventDefault();
    setActiveTab(tabIndex);
    switch (tabIndex) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/leaderboard");
        break;
      case 3:
        navigate("/new-poll");
        break;
      case 4:
        navigate("/");
        dispatch(logout());
        navigate(window.location.pathname);
        break;

      default:
        break;
    }
  };

  const navBarItem = (label, tabIndex, testId, url) => {
    return (
      <a
        className={`nav-bar-item ${
          activeTab === tabIndex ? "nav-bar-item-active" : ""
        }`}
        onClick={(event) => clickTab(event, tabIndex)}
        data-testid={testId}
        href={url}
      >
        {label}
      </a>
    );
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        {navBarItem("Home", 1, "home", "/")}
        {navBarItem("Leaderboard", 2, "leaderboard", "leaderboard")}
        {navBarItem("New", 3, "newPoll", "new-poll")}
      </div>
      <div className="nav-bar-item-center"></div>
      <div className="nav-bar-right">
        <div className="nav-bar-item nav-bar-item-user">
          {authUser ? authUser : "User"}
        </div>
        {navBarItem("Logout", 4, "logout", "logout")}
      </div>
    </div>
  );
};

export default Header;
