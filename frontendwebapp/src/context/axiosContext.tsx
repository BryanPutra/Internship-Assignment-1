import { AxiosInstance } from "axios";
import * as React from "react";
import { createContext, useContext } from "react";
import axios from "axios";
const portHostClient = "3000";
const apiURL = "https://884c-180-251-236-198.ap.ngrok.io/api"
const authorizationURL = "https://884c-180-251-236-198.ap.ngrok.io/api/form";
const authenticationURL = "https://884c-180-251-236-198.ap.ngrok.io/api/auth";
const testURL = "https://884c-180-251-236-198.ap.ngrok.io/api/form";

interface IAxiosContext {
  authenticationAxios: AxiosInstance;
  authorizationAxios: AxiosInstance;
  testAxios: AxiosInstance;
}

const axiosContextDefault: IAxiosContext = {
  authenticationAxios: axios.create(),
  authorizationAxios: axios.create(),
  testAxios: axios.create(),
};

const AxiosContext = createContext<IAxiosContext>(axiosContextDefault);

const useAxios = () => {
  return useContext(AxiosContext);
};

interface IAxiosProviderProps {
  children: React.ReactNode;
}

const AxiosProvider: React.FunctionComponent<IAxiosProviderProps> = (props) => {
  const authenticationAxios: AxiosInstance = axios.create({
    baseURL: authenticationURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const authorizationAxios: AxiosInstance = axios.create({
    baseURL: authorizationURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const testAxios: AxiosInstance = axios.create({
    baseURL: testURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },

  });

  const value = {
    authenticationAxios,
    authorizationAxios,
    testAxios,
  };

  return (
    <AxiosContext.Provider value={value}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export { AxiosProvider, useAxios };
