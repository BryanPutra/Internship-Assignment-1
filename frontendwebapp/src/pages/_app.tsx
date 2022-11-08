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
    <AxiosProvider>
      <MainProvider>
        <AuthProvider>
          <HistoryProvider>
            <ThemeProvider>
              <Protected>
                <Component {...pageProps} />
              </Protected>
            </ThemeProvider>
          </HistoryProvider>
        </AuthProvider>
      </MainProvider>
    </AxiosProvider>
  );
}

export default MyApp;
