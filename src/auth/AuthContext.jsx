import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

 
  function TriggerToken(){
    setIsAuthenticated(true);
  }

  function UnTrigger(){
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated,TriggerToken,UnTrigger }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
