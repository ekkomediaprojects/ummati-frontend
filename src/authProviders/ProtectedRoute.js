import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [showLoader, setShowLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoader(true);

      const timer = setTimeout(() => {
        setShowLoader(false);
        setRedirect(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);
  if (isLoggedIn) {
    return children;
  }
  if (showLoader) {
    return (
      <div style={loaderStyle}>
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }
  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return null;
};

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
};

export default ProtectedRoute;
