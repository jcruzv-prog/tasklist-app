"use client";
import React, { useState } from "react";
import { Button, Dialog, Stack, Container } from "@mui/material";
// import Login from "./login";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./login"), { ssr: false });

type pageProps = {};

const home: React.FC<pageProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{ border: "1px solid black", padding: "20px" }}
      >
        <Stack alignItems="center">
          <h1>Please login to review tasks</h1>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Login
          </Button>
        </Stack>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Login></Login>
      </Dialog>
    </div>
  );
};
export default home;
