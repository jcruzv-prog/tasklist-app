"use client";
import React from "react";
import AuthUserProvider from "./firebase/auth";
import Home from "./components/home";

type pageProps = {};

const App: React.FC<pageProps> = () => {
  return (
    <AuthUserProvider>
      <Home />
    </AuthUserProvider>
  );
};
export default App;
