"use client";
import React, { ReactElement } from "react";
import AuthUserProvider from "./firebase/auth";
import Home from "./components/home";

type pageProps = {
  children: ReactElement;
};

const App: React.FC<pageProps> = () => {
  return (
    <AuthUserProvider>
      <Home />
    </AuthUserProvider>
  );
};
export default App;
