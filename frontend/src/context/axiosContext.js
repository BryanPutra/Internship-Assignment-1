import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from 'react';
import axios from 'axios';
import Alert from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

let portHost = '8000';
// let publicURL = `http://localhost:${portHost}/api/auth/`;
// let authenticationURL = `http://localhost:${portHost}/api/auth/`;
let authorizationURL = `http://localhost:${portHost}/api/auth/`;
let authenticationURL = 'https://a32d-180-241-240-104.ap.ngrok.io/api/auth/';
let testURL = 'https://a32d-180-241-240-104.ap.ngrok.io/api/form/';

const AxiosContext = createContext();
const useAxios = () => {
  return useContext(AxiosContext);
};

const AxiosProvider = ({ children }) => {
  // for public or unprotected api calls
  // const publicAxios = axios.create({
  //   baseURL: publicURL,
  //   withCredentials: true,
  // });
  // for protected, authorized api calls
  const authorizeAxios = axios.create({
    baseURL: authorizationURL,
    withCredentials: true,
  });

  // for authentication purposes
  const authenticationAxios = axios.create({
    baseURL: authenticationURL,
    withCredentials: true,
  });

  const testAxios = axios.create({
    baseURL: testURL,
    withCredentials: true,
  });

  authorizeAxios.interceptors.request.use(async config => {
    cookie = getTokenCookie();
    config.headers.cookie = cookie ? cookie : '';
    return config;
  });

  const getTokenCookie = async () => {
    await CookieManager.clearAll();
    const cookie = await AsyncStorage.getItem('jwtCookie');
    return cookie;
  };

  // implementation of storing access token without cookies
  // authorizeAxios.interceptors.request.use(async (config) => {
  //   token = await AsyncStorage.getItem('cookie');
  //   config.headers.Authorization = token ? `Bearer ${token}` : "";
  //   return config;
  // }
  // (error) => {
  //   Promise.reject(error)
  // });

  
  const value = {
    authenticationAxios,
    authorizeAxios,
    testAxios,
    getTokenCookie,
  };
  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export {AxiosProvider, useAxios};
