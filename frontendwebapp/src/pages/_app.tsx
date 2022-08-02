import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { AuthProvider } from "context/authContext";
import { AxiosProvider } from "context/axiosContext";
import { ThemeProvider } from "@material-tailwind/react";
import Protected from "components/customRoute/Protected";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AxiosProvider>
      <AuthProvider>
        <ThemeProvider>
          <Protected>
            <Component {...pageProps} />
          </Protected>
        </ThemeProvider>
      </AuthProvider>
    </AxiosProvider>
  );
}

export default MyApp;
