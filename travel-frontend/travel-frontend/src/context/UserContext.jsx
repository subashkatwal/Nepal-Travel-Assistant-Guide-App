import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    console.log("[UserProvider] mounting - checking auth");
    axios.get("http://127.0.0.1:8000/api/check-auth/", { withCredentials: true })
      .then(res => {
        if (res.data.logged_in) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          console.log("[UserProvider] logged in as", res.data.email);
        } else {
          setLoggedIn(false);
          setUserEmail(null);
          console.log("[UserProvider] not logged in");
        }
      })
      .catch(err => {
        setLoggedIn(false);
        setUserEmail(null);
        console.warn("[UserProvider] check-auth failed:", err?.message || err);
      });
  }, []);

  const loginUser = (email) => {
    console.log("[UserProvider] loginUser called", email);
    setLoggedIn(true);
    setUserEmail(email);
  };

  const logoutUser = () => {
    console.log("[UserProvider] logoutUser called");
    setLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, userEmail, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};