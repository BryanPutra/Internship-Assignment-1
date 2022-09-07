import * as React from "react";
import { useContext, useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

//local
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";

//libs
import { useAuth } from "./authContext";
import { useHistory } from "./historyContext";

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
  isHome: boolean;
  setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
  isFromHome: boolean;
  setIsFromHome: React.Dispatch<React.SetStateAction<boolean>>;
  isBack: boolean;
  setIsBack: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  ktpIsActive: boolean;
  setKtpIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  ktpIsFilled: boolean;
  setKtpIsFilled: React.Dispatch<React.SetStateAction<boolean>>;
  formIsActive: boolean;
  setFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  formIsFilled: boolean;
  setFormIsFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const mainContextDefault: IMainContext = {
  user: {} as IUser,
  setUser: () => {},
  productSectionSelected: "",
  setProductSectionSelected: () => {},
  creatingProductName: "",
  setCreatingProductName: () => {},
  currentPage: "",
  setCurrentPage: () => {},
  prevPage: "",
  setPrevPage: () => {},
  isHome: true,
  setIsHome: () => {},
  isFromHome: true,
  setIsFromHome: () => {},
  isBack: true,
  setIsBack: () => {},
  isSubmit: false,
  setIsSubmit: () => {},
  ktpIsActive: false,
  setKtpIsActive: () => {},
  ktpIsFilled: false,
  setKtpIsFilled: () => {},
  formIsActive: false,
  setFormIsActive: () => {},
  formIsFilled: false,
  setFormIsFilled: () => {},
};

const MainContext = createContext<IMainContext>(mainContextDefault);

const useMain = () => {
  return useContext(MainContext);
};

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FunctionComponent<IMainProviderProps> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [productSectionSelected, setProductSectionSelected] =
    useState<string>("");
  const [creatingProductName, setCreatingProductName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("");
  const [prevPage, setPrevPage] = useState<string>("");
  const [isHome, setIsHome] = useState<boolean>(false);
  const [isFromHome, setIsFromHome] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [ktpIsActive, setKtpIsActive] = useState<boolean>(true);
  const [ktpIsFilled, setKtpIsFilled] = useState<boolean>(false);
  const [formIsActive, setFormIsActive] = useState<boolean>(false);
  const [formIsFilled, setFormIsFilled] = useState<boolean>(false);

  useEffect(() => {
    switch (currentPage) {
      case "home":
        router.push("/inputs/inputData");
        break;
      case "ktp-1":
        router.push("/inputs/takePhoto");
        break;
      case "ktp-2":
        router.push("/inputs/inputForm");
        break;
    }
    console.log(currentPage);
    console.log(prevPage);
  }, [currentPage]);

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
    isHome,
    setIsHome,
    isFromHome,
    setIsFromHome,
    isBack,
    setIsBack,
    isSubmit,
    setIsSubmit,
    ktpIsActive,
    setKtpIsActive,
    ktpIsFilled,
    setKtpIsFilled,
    formIsActive,
    setFormIsActive,
    formIsFilled,
    setFormIsFilled,
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { useMain, MainProvider };
