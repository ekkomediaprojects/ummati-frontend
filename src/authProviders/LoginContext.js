import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "../pages/Login";

const LoginRoute = () => {
  // const { isLoggedIn } = useAuth();
  // return isLoggedIn ? <Navigate to="/profile" replace /> : <Login />;
  return  <Login />;

};

export default LoginRoute;
