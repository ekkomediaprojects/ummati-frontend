import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // 👈 loader state

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
      const storedUser = localStorage.getItem("userData") || sessionStorage.getItem("userData");

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserDetails(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          logout();
        }
      } else {
        setIsLoggedIn(false);
      }

      setAuthLoading(false); // ✅ finished checking
    };

    // simulate delay for smoother UX (2 sec minimum loader)
    const timer = setTimeout(checkAuth, 2000);

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
    setUserDetails(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userDetails, setUserDetails, setIsLoggedIn, logout, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
