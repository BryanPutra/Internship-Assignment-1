import { AxiosInstance, AxiosPromise } from "axios";
import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useAxios } from "./axiosContext";
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";
import { useRouter } from 'next/router';

interface IAuthContext {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: User[];
  setUserDetails?: React.Dispatch<React.SetStateAction<User[]>>;
  login: (data: Object) => Promise<any>;
  logout: () => Promise<any>;
  testPostAuth: () => Promise<any>,
}

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

const authContextDefault: IAuthContext = {
  authState: false,
  setAuthState: () => {},
  userDetails: [],
  setUserDetails: () => {},
  login: async () => {},
  logout: async () => {},
  testPostAuth: async () => {},
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
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const { authenticationAxios, testAxios } = useAxios();
  const router = useRouter();

  //bambangaja@gmail.com
  //12345

  const login = async (data: Object) => {
    try {
      const response = await authenticationAxios.post("/login", data);
      setUserDetails(users => [...users, response.data]);
      setAuthState(true);
      alert("Logged in successfully");
      router.push("/mainmenu");
    } catch (err) {
      alert(`Failed to login, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const testPostAuth = async () => {
    try {
      const response = await testAxios.get('/home');
      console.log(response);
    } catch (err) {
      console.log(err);
      alert(`Failed to fetch, ${errorUtils.getErrorMessage(err)}`);
    }
  }

  const logout = async () => {
    try {
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
    testPostAuth
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
