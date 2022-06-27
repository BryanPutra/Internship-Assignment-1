import React, { useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
  });

  const [currentUser, setCurrentUser] = useState(undefined);

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const value = {
    authState,
    currentUser,
    setAuthState,
    setCurrentUser,
    getAccessToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export {useAuth, AuthProvider}