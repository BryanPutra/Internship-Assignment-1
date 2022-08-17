import * as React from "react";
import { useContext, useState, createContext } from "react";
import { useRouter } from "next/router";

//local
import * as errorUtils from "utils/errorUtils";
import * as dataUtils from "utils/dataUtils";

//libs
import { AxiosInstance, AxiosPromise } from "axios";
import { useAxios } from "./axiosContext";

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
  const [productSectionSelected, setProductSectionSelected] = useState<string>("");
  const [creatingProductName, setCreatingProductName] = useState<string>("");

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
