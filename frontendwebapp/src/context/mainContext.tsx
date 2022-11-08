import * as React from "react";
import { useContext, useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { json } from "stream/consumers";
import { Logout } from "@mui/icons-material";
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
  mainStates: IDefaultMainStates;
  setMainStates: React.Dispatch<React.SetStateAction<IDefaultMainStates>>;
  resetMainStates: () => void;
}

interface IDefaultMainStates {
  user: IUser;
  productSectionSelected: string;
  creatingProductName: string;
  currentPage: string;
  prevPage: string;
  isHome: boolean;
  isFromHome: boolean;
  isBack: boolean;
  isSubmit: boolean;
  ktpIsActive: boolean;
  ktpIsFilled: boolean;
  formIsActive: boolean;
  formIsFilled: boolean;
}

const defaultMainStates: IDefaultMainStates = {
  user: {} as IUser,
  productSectionSelected: "",
  creatingProductName: "",
  currentPage: "",
  prevPage: "",
  isHome: true,
  isFromHome: true,
  isBack: false,
  isSubmit: false,
  ktpIsActive: false,
  ktpIsFilled: false,
  formIsActive: false,
  formIsFilled: false,
};

const getInitialStates = (): IDefaultMainStates => {
  const mainStates: string | null =
    typeof window !== "undefined"
      ? localStorage.getItem("mainStates") || null
      : null;
  return mainStates ? JSON.parse(mainStates) : defaultMainStates;
};

const MainContext = createContext<IMainContext>({} as IMainContext);

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
  const [mainStates, setMainStates] =
    // useState<IDefaultMainStates>(Object.keys(getInitialStates().user).length === 0 ? getInitialStates :);
    useState<IDefaultMainStates>(getInitialStates);

  const resetMainStates = () => {
    setMainStates(defaultMainStates);
    localStorage.clear();
  };

  const setStatesFromStorage = (storageStates: IDefaultMainStates) => {
    if (!localStorage.getItem('mainStates')) return;
    setMainStates({
      ...mainStates,
      user: storageStates.user,
      productSectionSelected: storageStates.productSectionSelected,
      creatingProductName: storageStates.creatingProductName,
      currentPage: storageStates.currentPage,
      prevPage: storageStates.prevPage,
      isHome: storageStates.isHome,
      isFromHome: storageStates.isFromHome,
      isBack: storageStates.isBack,
      isSubmit: storageStates.isSubmit,
      ktpIsActive: storageStates.ktpIsActive,
      ktpIsFilled: storageStates.ktpIsFilled,
      formIsActive: storageStates.formIsActive,
      formIsFilled: storageStates.formIsFilled,
    });
  };

  useEffect(() => {
    setMainStates({
      ...mainStates,
      user: user,
      productSectionSelected: productSectionSelected,
      creatingProductName: creatingProductName,
      currentPage: currentPage,
      prevPage: prevPage,
      isHome: isHome,
      isFromHome: isFromHome,
      isBack: isBack,
      isSubmit: isSubmit,
      ktpIsActive: ktpIsActive,
      ktpIsFilled: ktpIsFilled,
      formIsActive: formIsActive,
      formIsFilled: formIsFilled,
    });
  }, [
    user,
    productSectionSelected,
    creatingProductName,
    currentPage,
    prevPage,
    isHome,
    isFromHome,
    isBack,
    isSubmit,
    ktpIsActive,
    ktpIsFilled,
    formIsActive,
    formIsFilled,
  ]);

  useEffect(() => {
    if (Object.keys(mainStates.user).length === 0) {
      const storageMainStates: IDefaultMainStates = JSON.parse(
        localStorage.getItem("mainStates")!
      );
      setStatesFromStorage(storageMainStates);
      return;
    }
    localStorage.setItem("mainStates", JSON.stringify(mainStates));
    console.log(mainStates, localStorage);
  }, [mainStates]);

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
    mainStates,
    setMainStates,
    resetMainStates,
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { useMain, MainProvider };
