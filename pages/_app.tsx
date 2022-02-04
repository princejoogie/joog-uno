import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          success: {
            className: "",
            style: {
              backgroundColor: "#16A34A",
              color: "#ffffff",
            },
          },
          error: {
            className: "",
            style: {
              backgroundColor: "#DC2626",
              color: "#ffffff",
            },
          },
        }}
      />
    </>
  );
}

export default MyApp;
