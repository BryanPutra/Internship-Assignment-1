import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { AuthProvider } from "context/authContext";
import { AxiosProvider } from "context/axiosContext";
import { ThemeProvider } from "@material-tailwind/react";
import { MainProvider } from "context/mainContext";
import { HistoryProvider } from "context/historyContext";
import Protected from "components/customRoute/Protected";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Protected>
      <AxiosProvider>
        <MainProvider>
          <AuthProvider>
            <HistoryProvider>
              <ThemeProvider>
                <Component {...pageProps} />
              </ThemeProvider>
            </HistoryProvider>
          </AuthProvider>
        </MainProvider>
      </AxiosProvider>
    </Protected>
  );
}

export default MyApp;
