import { useAuth } from "context/authContext";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useMain } from "context/mainContext";

interface IProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FunctionComponent<IProtectedProps> = (props) => {
  const { checkAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("fuck shet");
    
    checkAuthenticated();
    console.log("done");
    
  }, [router.asPath]);

  useEffect(() => {
    console.log("fuck shit");
    
    checkAuthenticated();
  }, []);


  return (<>{props.children}</>)
};

export default Protected;
