"use client";
import React from "react";

//material components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

type StyledButtonProps = {
  variant?: "hashtag" | "email" | "mention" | "link";
  children: React.ReactNode;
};

const StyledButton: React.FC<StyledButtonProps> = ({ variant, children }) => {
  const theme = useTheme();
  return (
    <Button variant="outlined" sx={{backgroundColor:variant?theme.decorators[variant].background:'initial'}}>
      <Typography
        component="span"
        color={variant ? theme.decorators[variant].text : "initial"}
      >
        {children}
      </Typography>
    </Button>
  );
};
export default StyledButton;
