"use client";
import React from "react";

//material components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

//icons
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

type StyledButtonProps = {
  variant: "hashtag" | "email" | "mention" | "link";
  children: React.ReactNode;
};

const StyledButton: React.FC<StyledButtonProps> = ({ variant, children }) => {
  const theme = useTheme();
  if (variant === "email") {
    return (
      <Button
        variant="outlined"
        startIcon={<MailOutlinedIcon />}
        size="small"
        sx={{
          backgroundColor: theme.decorators[variant].background,
          borderRadius: "50px",
        }}
      >
        <Typography component="span" color={theme.decorators[variant].text}>
          {"Mail"}
        </Typography>
      </Button>
    );
  }
  if (variant === "link") {
    return (
      <Button
        variant="outlined"
        startIcon={<LinkOutlinedIcon />}
        size="small"
        sx={{
          backgroundColor: theme.decorators[variant].background,
          borderRadius: "50px",
        }}
      >
        <Typography component="span" color={theme.decorators[variant].text}>
          {"Link"}
        </Typography>
      </Button>
    );
  }
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: theme.decorators[variant].background,
        borderRadius: "50px",
      }}
    >
      <Typography component="span" color={theme.decorators[variant].text}>
        {children}
      </Typography>
    </Button>
  );
};
export default StyledButton;
