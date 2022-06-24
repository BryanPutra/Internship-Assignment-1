import React, { useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  // const [authState, setAuthState] = useState({
  //   accessToken: null,
  //   authenticated: null,
  // });
  
  const getAccessToken = () => {
    return authState.accessToken;
  };

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthenticated(false);
  };

  const value = {
    authenticated,
    setAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export {useAuth, AuthProvider}