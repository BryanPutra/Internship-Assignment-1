import React, { useContext, useEffect, useState, createContext } from "react";
import { useAxios } from "./axiosContext";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const {testAxios, getTokenCookie, authenticationAxios} = useAxios();
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: false,
  });

  const [currentUser, setCurrentUser] = useState(null);

  const login = async data => {
    try {
      const {setAuthState, setCurrentUser} = useAuth();
      const response = await authenticationAxios.post('/login', data);
      setCurrentUser(response.data.username);
      const jwtCookie = response.headers.get('set-cookie');
      await AsyncStorage.setItem('jwtCookie', jwtCookie);
      setAuthState({
        accessToken: jwtCookie || null,
        authenticated: jwtCookie !== null,
      });
      navigation.navigate('MainMenu');
    } catch (err) {
      Alert.alert('Failed to login', err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setAuthState({
        accessToken: null,
        authenticated: false,
      });
      setCurrentUser(null);
    } catch (err) {
      Alert.alert('Failed  to logout', err.message);
      console.log(err);
    }
  };

  const testPostAuth = async data => {
    try {
      const response = await testAxios.get('/home');
      return response;
    } catch (err) {
      Alert.alert('Failed to fetch', err.response.data.message);
    }
  };

  const register = async data => {
    try {
      const response = await authenticationAxios.post('/register', data);
      login(data);
    } catch (err) {
      Alert.alert('Failed to register', err.response.data.message);
    }
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const value = {
    authState,
    currentUser,
    setAuthState,
    setCurrentUser,
    getAccessToken,
    login,
    logout,
    register,
    testPostAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export {useAuth, AuthProvider}