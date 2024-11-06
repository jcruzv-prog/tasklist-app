"use client";
import { auth } from "../firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Container, Box, Typography } from "@mui/material";

import { useEffect } from "react";

//FirebaseUI config
const firebaseUIConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/tasks",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const ui = new firebaseui.auth.AuthUI(auth);
const Login = () => {
  useEffect(() => ui.start("#firebaseui-container", firebaseUIConfig), []);
  return (
    <Container maxWidth="md">
      <Typography variant="h6">Select authentication method:</Typography>
      <Box id="firebaseui-container"></Box>
    </Container>
  );
};

export default Login;
