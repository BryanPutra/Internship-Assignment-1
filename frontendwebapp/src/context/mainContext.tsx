import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useRouter } from "next/router";

//local
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";

//libs
import { AxiosInstance, AxiosPromise } from "axios";
import { useAxios } from "./axiosContext";
import { useAuth } from "./authContext";

interface IUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface IMainContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  productSectionSelected: string;
  setProductSectionSelected: React.Dispatch<React.SetStateAction<string>>;
  creatingProductName: string;
  setCreatingProductName: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  prevPage: string;
  setPrevPage: React.Dispatch<React.SetStateAction<string>>;
  isBack: boolean;
  setIsBack: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const mainContextDefault: IMainContext = {
  user: { id: "", username: "", email: "", roles: [""] },
  setUser: () => {},
  productSectionSelected: "",
  setProductSectionSelected: () => {},
  creatingProductName: "",
  setCreatingProductName: () => {},
  currentPage: "",
  setCurrentPage: () => {},
  prevPage: "",
  setPrevPage: () => {},
  isBack: true,
  setIsBack: () => {},
  isSubmit: false,
  setIsSubmit: () => {},
};

const MainContext = createContext<IMainContext>(mainContextDefault);

const useMain = () => {
  return useContext(MainContext);
};

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FunctionComponent<IMainProviderProps> = (props) => {
  const {userDetails} = useAuth();
  const [user, setUser] = useState(userDetails[0]);
  const [productSectionSelected, setProductSectionSelected] =
    useState<string>("");
  const [creatingProductName, setCreatingProductName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("ktp-2");
  const [prevPage, setPrevPage] = useState<string>("home");
  const [isBack, setIsBack] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const value = {
    user,
    setUser,
    productSectionSelected,
    setProductSectionSelected,
    creatingProductName,
    setCreatingProductName,
    currentPage,
    setCurrentPage,
    prevPage,
    setPrevPage,
    isBack,
    setIsBack,
    isSubmit,
    setIsSubmit,
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { useMain, MainProvider };
