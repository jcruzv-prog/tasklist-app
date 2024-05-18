import { render, screen } from "@testing-library/react";
import StyledButton from "./styledButton";
import { ThemeProvider } from "@mui/material";
import theme from "app/theme/theme";

describe("styled button renders correctly", () => {
  it("renders a hashtag-styled button", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledButton variant="hashtag" children="#world" />
      </ThemeProvider>
    );
    const span = screen.getByText("#world");
    const button = screen.getByRole("button");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #702EE6");
    expect(button).toBeInTheDocument();
  });

  it("renders a email-styled button", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledButton variant="email" children="jon@email.com" />
      </ThemeProvider>
    );
    const span = screen.getByText("Mail");
    const button = screen.getByRole("button");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #F58E0A");
    expect(button).toBeInTheDocument();
  });

  it("renders a mention-styled button", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledButton variant="mention" children="@developer" />
      </ThemeProvider>
    );
    const span = screen.getByText("@developer");
    const button = screen.getByRole("button");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #07A873");
    expect(button).toBeInTheDocument();
  });

  it("renders a link-styled button", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledButton variant="link" children="www.google.com" />
      </ThemeProvider>
    );
    const span = screen.getByText("Link");
    const button = screen.getByRole("button");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #007FFF");
    expect(button).toBeInTheDocument();
  });
});
