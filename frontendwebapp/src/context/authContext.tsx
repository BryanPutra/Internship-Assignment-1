import { AxiosInstance, AxiosPromise } from "axios";
import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useAxios } from "./axiosContext";
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";
import { useRouter } from 'next/router';
import { useMain } from "./mainContext";

interface IAuthContext {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: IUser[];
  setUserDetails?: React.Dispatch<React.SetStateAction<IUser[]>>;
  login: (data: Object) => Promise<any>;
  logout: () => Promise<any>;
  testPostAuth: () => Promise<any>,
}

interface IUser {
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
  const [authState, setAuthState] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IUser[]>([]);
  const {user, setUser} = useMain();
  const { authenticationAxios, testAxios } = useAxios();
  const router = useRouter();

  //bambangaja@gmail.com
  //12345

  const login = async (data: Object) => {
    try {
      const response = await authenticationAxios.post("/login", data);
      const userDetail: IUser = response.data      
      setUserDetails(users => [...users, userDetail]);
      // setUser({...user, id: userDetail.id, username: userDetail.username, email: userDetail.email, roles: userDetail.roles } as IUser);
      // setUser({...user, ...{id: userDetail.id, username: userDetail.username, email: userDetail.email, roles: userDetail.roles} as IUser});
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
