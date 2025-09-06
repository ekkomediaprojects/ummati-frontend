import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const logoutTimerRef = useRef(null);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  };

  const startLogoutTimer = (token, role) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const expiryTime = payload.exp * 1000;
      // const expiryTime = Date.now() + 10*1000

      const timeout = expiryTime - Date.now();

      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

      logoutTimerRef.current = setTimeout(() => {
        logout(role);
      }, timeout);

      console.log(`⏳ Auto-logout set in: ${Math.floor(timeout / 1000)}s`);
    } catch (err) {
      console.error("Failed to set logout timer:", err);
    }
  };

  const login = (token, user) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    sessionStorage.setItem("userToken", token);
    sessionStorage.setItem("userData", JSON.stringify(user));
    sessionStorage.setItem("role", "user")

    setUserDetails(user);
    setIsLoggedIn(true);

    // start auto logout timer
    startLogoutTimer(token, user.role);
  };

  const logout = (role) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");

    setUserDetails(null);
    setIsLoggedIn(false);

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    if (role === "admin") window.location.replace("/admin-login");
    else window.location.replace("/login");
  };

  useEffect(() => {
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
          startLogoutTimer(token, parsedUser.role);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
        logout();
      }
    } else {
      setIsLoggedIn(false);
    }

    setAuthLoading(false);

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
