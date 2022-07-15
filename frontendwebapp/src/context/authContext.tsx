import { AxiosInstance, AxiosPromise } from "axios";
import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useAxios } from "./axiosContext";
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";

interface IAuthContext {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: Object;
  login: (data: Object) => Promise<any>;
  logout: () => Promise<any>;
}

interface User {
  username: string;
  email: string;
}

const authContextDefault: IAuthContext = {
  authState: false,
  setAuthState: () => {},
  userDetails: {},
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

const useAuth = () => {
  return useContext(AuthContext);
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FunctionComponent<IAuthProviderProps> = (props) => {
  const [authState, setAuthState] = useState(false);
  const { authenticationAxios } = useAxios();
  const userDetails: User[] = [];

  const login = async (data: Object) => {
    try {
      const response = await authenticationAxios.post("/login", data);
      userDetails.push(response.data as User);
      setAuthState(true);
      alert("Logged in successfully");
    } catch (err) {
      alert(`Failed to login, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const logout = async () => {
    try {
      setAuthState(false);
      dataUtils.clearArray(userDetails);
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
    logout
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
