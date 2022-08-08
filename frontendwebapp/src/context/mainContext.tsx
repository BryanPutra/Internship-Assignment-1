import { AxiosInstance, AxiosPromise } from "axios";
import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useAxios } from "./axiosContext";
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";
import { useRouter } from "next/router";

interface IMainContext {
  productSectionSelected: string;
  setProductSectionSelected: React.Dispatch<React.SetStateAction<string>>;
  creatingProductName: string;
  setCreatingProductName: React.Dispatch<React.SetStateAction<string>>;
}

const mainContextDefault: IMainContext = {
  productSectionSelected: "",
  setProductSectionSelected: () => {},
  creatingProductName: "",
  setCreatingProductName: () => {},
};

const MainContext = createContext<IMainContext>(mainContextDefault);

const useMain = () => {
  return useContext(MainContext);
};

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FunctionComponent<IMainProviderProps> = (props) => {
  const [productSectionSelected, setProductSectionSelected] = useState("");
  const [creatingProductName, setCreatingProductName] = useState("");
  const value = {
    productSectionSelected,
    setProductSectionSelected,
    creatingProductName,
    setCreatingProductName
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { useMain, MainProvider };
