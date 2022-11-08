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
    if (router.asPath === "/") return;
    if (router.asPath.includes("/auth")) return;
    console.log('shit');
    checkAuthenticated();
  }, [router.asPath]);

  useEffect(() => {
    if (router.asPath === "/") return;
    if (router.asPath.includes("/auth")) return;
    console.log('shit');
    checkAuthenticated();
  }, []);

  return (<>{props.children}</>)
};

export default Protected;
