// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DataChart from "./Components/DataChart";
import Root from "./Layouts/Root";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import AuthRouter from "./Utils/AuthRouter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<AuthRouter />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="data/:id" element={<DataChart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
