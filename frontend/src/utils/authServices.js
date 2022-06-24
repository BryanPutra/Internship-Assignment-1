import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-native";
import * as Keychain from "react-native-keychain";
import useAuth from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

let portHost = "8000";
let publicURL = `http://localhost:${portHost}/api/auth/`;
let authenticationURL = `http://localhost:${portHost}/api/auth/`;
let authorizationURL = `http://localhost:${portHost}/api/auth/`;

const { setAuthenticated } = useAuth();
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

authorizeAxios.interceptors.request.use((config) => {
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
}
(error) => {
  Promise.reject(error)
});

const getCookie = async () => {
  await CookieManager.clearAll();
  const cookie = await AsyncStorage.getItem("cookie");
  return cookie;
};

const loadJWT = useCallback(async () => {
  try {
    const value = await Keychain.getGenericPassword();
    const jwt = JSON.parse(value.password);
    setAuthenticated(true);
  } catch (err) {
    console.log(`Keychain Error: ${err.message}`);
    setAuthenticated(false);
  }
}, []);

const register = async (data) => {
  try {
    const response = await authenticationAxios.post("/register", data);
    login(data);
    setAuthenticated(true);
  } catch (err) {}
};

const login = async (data) => {
  try {
    const response = await authenticationAxios.post("/login", data);
    const jwtCookie = await AsyncStorage.getItem("cookie");

    setAuthenticated(true);
    navigation.navigate("MainMenu");
  } catch (err) {
    Alert.alert("Failed to login", error.response.data.message);
  }
};

export { loadJWT, login, register };
