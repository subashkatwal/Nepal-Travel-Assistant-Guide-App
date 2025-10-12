import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check login status when app loads
    axios.get("http://127.0.0.1:8000/api/check-auth/", { withCredentials: true })
      .then(res => {
        if(res.data.logged_in) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setUserEmail(null);
      });
  }, []);

  const loginUser = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
  };

  const logoutUser = () => {
    setLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, userEmail, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
