import { useAuth } from "context/authContext";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

interface IProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FunctionComponent<IProtectedProps> = (props) => {
  const { checkAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuthenticated();
    console.log("check based on route change");
  }, [router.asPath]);

  useEffect(() => {
    checkAuthenticated();
    console.log("change based on first render");
  }, []);

  return (<>{props.children}</>)
};

export default Protected;
