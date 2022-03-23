import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function NavigationGuard({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  console.log(location.pathname)

  if (!token && location.pathname === "/dealer/dashboard") {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
