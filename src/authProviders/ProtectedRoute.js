import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
