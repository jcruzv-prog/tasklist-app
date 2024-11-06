"use client";
import React, { ReactElement } from "react";
import AuthUserProvider from "./firebase/auth";
import Home from "./components/home";

type pageProps = {
  children: ReactElement;
};

const app: React.FC<pageProps> = () => {
  return (
    <AuthUserProvider>
      <Home></Home>
    </AuthUserProvider>
  );
};
export default app;
