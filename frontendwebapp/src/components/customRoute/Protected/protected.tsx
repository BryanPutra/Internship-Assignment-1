import { useAuth } from "context/authContext";
import * as React from "react";
import { useCallback, useEffect } from "react";

interface IProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FunctionComponent<IProtectedProps> = (props) => {
  const { authState, setAuthState, logout, userDetails } = useAuth();
  // code if user wants to go to protected while not authenticated
  // code if user wants to go back to login page when authenticated

  const checkAuth = useCallback(() => {
    console.log(authState, userDetails);
    !authState ? logout() : setAuthState(true);
  }, [authState]);

  useEffect(() => {
    checkAuth();
  }, [authState]);

  return (<>{props.children}</>)
};

export default Protected;
