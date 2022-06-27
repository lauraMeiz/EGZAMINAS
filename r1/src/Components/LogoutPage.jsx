import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../Functions/auth";

function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to="/login" replace />;
}

export default LogoutPage;
