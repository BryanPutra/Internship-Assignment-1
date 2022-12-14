import { AxiosResponse } from "axios";
import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useAxios } from "./axiosContext";
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";
import { useRouter } from "next/router";
import { useMain } from "./mainContext";

import type { IUser } from "interfaces/inputFormInterfaces";

interface IAuthContext {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: IUser[];
  setUserDetails?: React.Dispatch<React.SetStateAction<IUser[]>>;
  login: (data: Object) => Promise<any>;
  logout: () => Promise<any>;
  testPostAuth: () => Promise<any>;
  checkAuthenticated: () => Promise<any>;
}

const authContextDefault: IAuthContext = {
  authState: false,
  setAuthState: () => {},
  userDetails: [],
  setUserDetails: () => {},
  login: async () => {},
  logout: async () => {},
  testPostAuth: async () => {},
  checkAuthenticated: async () => {},
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

const useAuth = () => {
  return useContext(AuthContext);
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FunctionComponent<IAuthProviderProps> = (props) => {
  const [authState, setAuthState] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IUser[]>([]);
  const { resetMainStates, setUser } = useMain();
  const { authenticationAxios, testAxios, authorizationAxios } = useAxios();
  const router = useRouter();

  const isAuthorized = (response: AxiosResponse) => response.status === 200;

  const login = async (data: Object) => {
    try {
      const response = await authenticationAxios.post("/login", data);
      const userDetail: IUser = response.data;
      console.log(response.data);
      setUserDetails((users) => [...users, userDetail]);
      setUser(userDetail);
      setAuthState(true);
      alert("Logged in successfully");
      router.push("/mainmenu");
    } catch (err) {
      alert(`Failed to login, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const isNotInMain = router.asPath === "/" || router.asPath.includes("/auth");

  const checkAuthenticated = async () => {    
    try {
      if (!localStorage.getItem("mainStates")){
        console.log("localStorage cant find any states");
        logout();
        return
      };
      const response = await authorizationAxios.get("/home");
      console.log(response);
      if (isNotInMain) {
        router.replace("/mainmenu");
      }
    } catch (err) {
      console.log(err);
      if (isNotInMain) {
        alert(`User is not authenticated. Please login again.`);
      }
      console.log("logging out");
      logout();
    }
  };

  const testPostAuth = async () => {
    try {
      const response = await testAxios.get("/home");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert(`Failed to fetch, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const logout = async () => {
    try {
      resetMainStates();
      setAuthState(false);
      dataUtils.clearArray(userDetails);      
      router.replace("/auth/login");
    } catch (err) {
      alert(`Failed to logout, ${errorUtils.getErrorMessage(err)}`);
    }
  };
  const register = async (data: Object) => {
    try {
      const response = await authenticationAxios.post("/register", data);
      alert("Registered successfully");
      await login(response.data);
    } catch (err) {
      alert(`Failed to register, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const value = {
    authState,
    setAuthState,
    userDetails,
    login,
    logout,
    testPostAuth,
    checkAuthenticated,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
