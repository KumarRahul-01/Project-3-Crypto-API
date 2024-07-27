// AuthRouter.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouter = () => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRouter;
