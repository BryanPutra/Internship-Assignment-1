import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "context/authContext";
import MainContainer from "components/containers/MainContainer";
import RefreshIcon from "@mui/icons-material/Refresh";

const Home: NextPage = () => {
  const router = useRouter();
  const { authState, logout } = useAuth();

  const redirect = useCallback(() => {
    !authState ? logout() : router.back();
  }, []);

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <MainContainer containerType="primary">
      <div className="flex flex-col items-center justify-center text-2xl min-h-screen">
        <div className="m-auto flex flex-col items-center justify-center">
          <div>Redirecting.... Please wait</div>
          <svg className="animate-spin h-2/5 w-2/5" viewBox="0 0 24 24">
            <RefreshIcon />
          </svg>
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;
