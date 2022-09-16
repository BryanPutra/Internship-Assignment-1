import { useAuth } from "context/authContext";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

interface IProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FunctionComponent<IProtectedProps> = (props) => {
  const { authState, setAuthState, logout, userDetails } = useAuth();
  const router = useRouter();

  // code if user wants to go to protected while not authenticated
  // code if user wants to go back to login page when authenticated



  const checkAuth = useCallback(() => {
    !authState ? logout() : setAuthState(true);
  }, [authState]);

  useEffect(() => {
    checkAuth();
  }, [router.asPath]);

  useEffect(() => {
    checkAuth();
  }, [authState]);

  return (<>{props.children}</>)
};

export default Protected;
