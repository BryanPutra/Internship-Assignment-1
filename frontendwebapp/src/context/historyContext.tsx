import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { useMain } from "./mainContext";

interface IHistoryProviderProps {
  children: React.ReactNode;
}

interface IHistoryContext {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  back(): void;
}

const HistoryContext = createContext<IHistoryContext>({} as IHistoryContext);
const useHistory = () => {
  return useContext(HistoryContext);
};

const HistoryProvider: React.FunctionComponent<IHistoryProviderProps> = (
  props
) => {
  const { asPath, push, pathname } = useRouter();
  const [history, setHistory] = useState<string[]>([]);
  const { currentPage, setCurrentPage, prevPage, setPrevPage } = useMain();

  const back = () => {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      if (!route.includes("#") && route !== pathname) {
        push(route);
        // if you want to pop history on back
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        break;
      }
    }
  };

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);    
    // setCurrentPage(history[history.length - 1]);
    // setPrevPage(history[history.length - 2]);
  }, [asPath]);
  // console.log(currentPage);
  // console.log(prevPage);
  // console.log(history);
  
  const value = {
    history,
    setHistory,
    back,
  };

  return (
    <HistoryContext.Provider value={value}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export { useHistory, HistoryProvider };
