"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    decorators: {
      hashtag: {
        text: string;
        background: string;
      };
      email: {
        text: string;
        background: string;
      };
      mention: {
        text: string;
        background: string;
      };
      link: {
        text: string;
        background: string;
      };
    };
  }

  interface ThemeOptions {
    decorators?: {
      hashtag?: {
        text?: string;
        background?: string;
      };
      email?: {
        text?: string;
        background?: string;
      };
      mention?: {
        text?: string;
        background?: string;
      };
      link?: {
        text?: string;
        background?: string;
      };
    };
  }
}

const theme = createTheme({
  decorators: {
    hashtag: {
      text: "#702EE6",
      background: "#DBC7FF",
    },
    email: {
      text: "#F58E0A",
      background: "#FFE6C7",
    },
    mention: {
      text: "#07A873",
      background: "#ADF0D9",
    },
    link: {
      text: "#007FFF",
      background: "#D6EBFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
