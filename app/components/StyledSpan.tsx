"use client";
import React from "react";

//material components
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

// import { DraftDecoratorComponentProps } from "draft-js";

type StyledSpanProps = {
  variant?: "hashtag" | "email" | "mention" | "link";
  children: React.ReactNode;
};

const StyledSpan: React.FC<StyledSpanProps> = ({ variant, children }) => {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      color={variant ? theme.decorators[variant].text : "initial"}
    >
      {children}
    </Typography>
  );
};
export default StyledSpan;
