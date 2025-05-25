import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.StrictMode>
  );
}
