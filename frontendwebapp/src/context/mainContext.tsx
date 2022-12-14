import * as React from "react";
import { useContext, useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

import type { IUser, IDefaultMainStates, ISectionDetails } from "interfaces/inputFormInterfaces";

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
  sectionDetails: ISectionDetails[];
  setSectionDetails: React.Dispatch<React.SetStateAction<ISectionDetails[]>>;
  isSectionPage: boolean;
  setIsSectionPage: React.Dispatch<React.SetStateAction<boolean>>;
  isFromSectionPage: boolean;
  setIsFromSectionPage: React.Dispatch<React.SetStateAction<boolean>>;
  isBack: boolean;
  setIsBack: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  mainStates: IDefaultMainStates;
  setMainStates: React.Dispatch<React.SetStateAction<IDefaultMainStates>>;
  resetMainStates: () => void;
  resetStatesAfterSubmit: () => void;
}

const defaultMainStates: IDefaultMainStates = {
  user: {} as IUser,
  productSectionSelected: "",
  creatingProductName: "",
  currentPage: "",
  prevPage: "",
  sectionDetails: [],
  isSectionPage: false,
  isFromSectionPage: false,
  isBack: false,
  isSubmit: false,
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
  const [sectionDetails, setSectionDetails] = useState<ISectionDetails[]>([]);
  const [isSectionPage, setIsSectionPage] = useState<boolean>(false);
  const [isFromSectionPage, setIsFromSectionPage] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [mainStates, setMainStates] =
    // useState<IDefaultMainStates>(Object.keys(getInitialStates().user).length === 0 ? getInitialStates :);
    useState<IDefaultMainStates>(getInitialStates);

  const resetMainStates = () => {
    setMainStates(defaultMainStates);
    localStorage.clear();
  };

  const resetStatesAfterSubmit = () => {
    setMainStates(prevState => ({
      ...prevState,
      creatingProductName: defaultMainStates.creatingProductName,
      sectionDetails: defaultMainStates.sectionDetails,
      isSectionPage: defaultMainStates.isSectionPage,
      isFromSectionPage: defaultMainStates.isFromSectionPage,
      currentPage: defaultMainStates.currentPage,
      prevPage: defaultMainStates.prevPage,
    }));
  }

  const setStatesFromStorage = (storageStates: IDefaultMainStates) => {
    setMainStates(prevState => ({
      ...prevState,
      user: storageStates.user,
      productSectionSelected: storageStates.productSectionSelected,
      creatingProductName: storageStates.creatingProductName,
      currentPage: storageStates.currentPage,
      prevPage: storageStates.prevPage,
      sectionDetails: storageStates.sectionDetails,
      isSectionPage: storageStates.isSectionPage,
      isFromSectionPage: storageStates.isFromSectionPage,
      isBack: storageStates.isBack,
      isSubmit: storageStates.isSubmit,
    }));
    console.log("setStateFromStorage");
  };

  useEffect(() => {
    setMainStates(prevState => ({
      ...prevState,
      user: user,
      productSectionSelected: productSectionSelected,
      creatingProductName: creatingProductName,
      currentPage: currentPage,
      prevPage: prevPage,
      sectionDetails: sectionDetails,
      isSectionPage: isSectionPage,
      isFromSectionPage: isFromSectionPage,
      isBack: isBack,
      isSubmit: isSubmit,
    }));
    console.log("userDetails:");
    console.log(user);
    console.log("setStateDefaultWway:");
    console.log(mainStates);
  }, [
    user,
    productSectionSelected,
    creatingProductName,
    currentPage,
    prevPage,
    isSectionPage,
    isFromSectionPage,
    isBack,
    isSubmit,
  ]);

  const contextStatesIsEmpty = Object.keys(mainStates.user).length === 0;

  useEffect(() => {
    const storageMainStates = localStorage.getItem("mainStates");
    if (contextStatesIsEmpty && !storageMainStates) return;
    if (contextStatesIsEmpty) {
      console.log("context is empty");
      const parsedStates: IDefaultMainStates = JSON.parse(storageMainStates!);
      setStatesFromStorage(parsedStates);
      return;
    }
    localStorage.setItem("mainStates", JSON.stringify(mainStates));
    console.log("mainStates & localStorage contents after changes");
    console.log(mainStates);
    console.log(localStorage);
  }, [mainStates]);

  useEffect(() => {
    switch (currentPage) {
      case "sectionPage":
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
    sectionDetails,
    setSectionDetails,
    isSectionPage,
    setIsSectionPage,
    isFromSectionPage,
    setIsFromSectionPage,
    isBack,
    setIsBack,
    isSubmit,
    setIsSubmit,
    mainStates,
    setMainStates,
    resetMainStates,
    resetStatesAfterSubmit
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { useMain, MainProvider };
