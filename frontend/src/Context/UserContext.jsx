import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { USERS_BASE_URL } from "../Constants";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [username, setUserName] = useState(null);
  
  useEffect(() => {
    async function getUserName() {
      try {
        const response = await axios.get(`${USERS_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        });
        const userName = await response.data.username;
        setUserName(userName);
        console.log("Username successfully fetched");
      } catch (error) {
        console.log("Unable to fetch username");
      }
    }
    
    // Setting the username
    getUserName();
  }, []);

  const value = useMemo(() => {
    return username;
  }, [username]);

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

