import React from "react";

//material components
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { DraftDecoratorComponentProps } from "draft-js";

type variant = {
  variant?: "hashtag" | "email" | "mention" | "link";
};

type StyledSpanProps = variant & DraftDecoratorComponentProps;

const StyledSpan: React.FC<StyledSpanProps> = ({
  variant,
  children,
  ...otherProps
}) => {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      {...otherProps}
      color={variant ? theme.decorators[variant].text : "initial"}
    >
      {children}
    </Typography>
  );
};
export default StyledSpan;
