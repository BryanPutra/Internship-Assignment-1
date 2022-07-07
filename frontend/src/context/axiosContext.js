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
import EncryptedStorage from 'react-native-encrypted-storage';

let portHost = '8000';
// let publicURL = `http://localhost:${portHost}/api/auth/`;
// let authenticationURL = `http://localhost:${portHost}/api/auth/`;
let authorizationURL = `http://localhost:${portHost}/api/auth`;
let authenticationURL = 'https://a9dc-180-241-240-164.ap.ngrok.io/api/auth';
let testURL = 'https://a9dc-180-241-240-164.ap.ngrok.io/api/form';
// bambangaja@gmail.com
// 12345

const AxiosContext = createContext();
const useAxios = () => {
  return useContext(AxiosContext);
};

const AxiosProvider = ({children}) => {
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
    const cookie = await getTokenCookie();
    config.headers.cookie = cookie ? cookie : '';
    return config;
  });

  testAxios.interceptors.request.use(async config => {
    const cookie = await getTokenCookie();
    console.log(cookie);
    config.headers.cookie = cookie ? cookie : '';
    return config;
  });

  const getTokenCookie = async () => {
    try {
      await CookieManager.clearAll();
      const cookie = await EncryptedStorage.getItem('jwtCookie');
      return cookie;
    } catch (err) {
      console.log(err);
    }
  };

  // implementation of storing access token without cookies
  // authorizeAxios.interceptors.request.use(async (config) => {
  //   token = await EncryptedStorage.getItem('cookie');
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
