import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { AuthProvider } from "context/authContext";
import { AxiosProvider } from "context/axiosContext";
import { ThemeProvider } from "@material-tailwind/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AxiosProvider>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </AxiosProvider>
  );
}

export default MyApp;
