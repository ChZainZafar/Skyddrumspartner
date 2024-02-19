// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext({
  isAdmin: false, // Admin status
  setIsAdmin: () => {}, // Function to update the admin status
});

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
