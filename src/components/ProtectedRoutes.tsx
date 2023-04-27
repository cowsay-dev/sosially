import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.FC;
}

const ProtectedRoutes = ({ component: Component }: Props) => {
  if (sessionStorage.getItem("logged-in") === "true") {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
