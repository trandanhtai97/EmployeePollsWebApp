import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "pages/Login/Login";
import { useDispatch } from "react-redux";
import { fetchPolls } from "stores/reducers/polls";
import { fetchUsers } from "stores/reducers/users";
import AppRoutes from "components/AppRoutes/AppRoutes";
import Dashboard from "pages/Dashboard/Dashboard";
import NotFound from "pages/NotFound/NotFound";
import PollDetail from "pages/PollDetail/PollDetail";
import Leaderboard from "pages/Leaderboard/Leaderboard";
import CreatePoll from "pages/CreatePoll/CreatePoll";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolls());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/question/:id" element={<PollDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/new-poll" element={<CreatePoll />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;
