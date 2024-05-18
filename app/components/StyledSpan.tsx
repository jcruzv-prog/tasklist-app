"use client";
import React from "react";

//material components
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

type StyledSpanProps = {
  variant?: "hashtag" | "email" | "mention" | "link";
  children: React.ReactNode;
};

const StyledSpan: React.FC<StyledSpanProps> = ({ variant, children }) => {
  const theme = useTheme();
  if (variant) {
    return (
      <Typography component="span" color={theme.decorators[variant].text}>
        {children}
      </Typography>
    );
  } else {
    return <Typography component="span">{children}</Typography>;
  }
};
export default StyledSpan;
