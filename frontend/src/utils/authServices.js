import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-native";
import * as Keychain from "react-native-keychain";
import useAuth from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import CookieManager from "react-native-cookies";
import AsyncStorage from "@react-native-async-storage/async-storage";

let portHost = "8000";
let publicURL = `http://localhost:${portHost}/api/auth/`;
let authenticationURL = `http://localhost:${portHost}/api/auth/`;
let authorizationURL = `http://localhost:${portHost}/api/auth/`;

const { setAuthState, setCurrentUser } = useAuth();
const navigation = useNavigation();

// for public or unprotected api calls
const publicAxios = axios.create({
  baseURL: publicURL,
  withCredentials: true,
});

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

const getTokenCookie = async () => {
  await CookieManager.clearAll();
  const cookie = await AsyncStorage.getItem("cookie");
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

authorizeAxios.interceptors.request.use(async (config) => {
  cookie = getTokenCookie();
  config.headers.Cookie = cookie ? cookie : "";
  return config;
});

const register = async (data) => {
  try {
    const response = await authenticationAxios.post("/register", data);
    login(data);
  } catch (err) {
    Alert.alert("Failed to register", err.response.data.message);
  }
};

const login = async (data) => {
  try {
    const response = await authenticationAxios.post("/login", data);
    setCurrentUser(response.data.username);
    const jwtCookie = getTokenCookie();
    setAuthState({
      accessToken: value || null,
      authenticated: value !== null,
    });
    navigation.navigate("MainMenu");
  } catch (err) {
    Alert.alert("Failed to login", err.response.data.message);
  }
};

const logout = async () => {
  try {
    await AsyncStorage.clear();
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
    setCurrentUser(undefined);
  } catch (err) {
    Alert.alert("Failed  to logout", err.message);
    console.log(err);
  }
};

export { login, register, logout, getTokenCookie };
