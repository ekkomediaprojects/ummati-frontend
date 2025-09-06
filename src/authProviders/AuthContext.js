import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  };

  const logout = (role) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");

    setUserDetails(null);
    setIsLoggedIn(false);

    if (role === "admin") window.location.replace("/admin-login");
    else window.location.replace("/login");
  };

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
      const storedUser =
        localStorage.getItem("userData") || sessionStorage.getItem("userData");

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          if (isTokenExpired(token)) {
            logout(parsedUser.role);
          } else {
            setUserDetails(parsedUser);
            setIsLoggedIn(true);

            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = payload.exp * 1000;
            const timeout = expiryTime - Date.now();
            const timer = setTimeout(() => logout(parsedUser.role), timeout);
            return () => clearTimeout(timer);
          }
        } catch (err) {
          console.error("Error parsing user data:", err);
          logout();
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    setAuthLoading(false)
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        setUserDetails,
        setIsLoggedIn,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
