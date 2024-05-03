import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "components/Login";
import { useDispatch } from "react-redux";
import { fetchPoll } from "reduces/polls";
import { fetchUser } from "reduces/users";
import AppRoutes from "actions/AppRoutes";
import Dashboard from "components/Dashboard";
import NotFound from "components/NotFound";
import PollDetail from "components/PollDetail";
import Leaderboard from "components/Leaderboard";
import CreatePoll from "components/NewPoll";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPoll());
    dispatch(fetchUser());
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
