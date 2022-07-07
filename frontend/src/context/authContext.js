import React, {useContext, useEffect, useState, createContext} from 'react';
import {useAxios} from './axiosContext';
import Alert from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
  const {testAxios, getTokenCookie, authenticationAxios} = useAxios();
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: false,
  });
  const [currentUser, setCurrentUser] = useState(null);

  const login = async data => {
    try { 
      const response = await authenticationAxios.post('/login', data);
      const jwtCookie = response.headers['set-cookie'][0];
      console.log(jwtCookie);
      const userDetails = response.data;
      console.log(userDetails);
      console.log(userDetails.username);
      setCurrentUser(userDetails.username);
      await EncryptedStorage.setItem(
        'userDetails',
        JSON.stringify(userDetails),
      );
      await EncryptedStorage.setItem('jwtCookie', jwtCookie);
      setAuthState({
        accessToken: jwtCookie || null,
        authenticated: jwtCookie !== null,
      });
    } catch (err) {
      console.log("login error");
      console.log(err);
      Alert.alert('Failed to login', err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await EncryptedStorage.clear();
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
      await login(response.data);
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
    testPostAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export {useAuth, AuthProvider};
