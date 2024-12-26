import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser !== undefined ||  storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);
      setIsLoggedIn(true);
    } else setIsLoggedIn(false)
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    setUserDetails(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
