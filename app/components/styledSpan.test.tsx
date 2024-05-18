import { render, screen } from "@testing-library/react";
import StyledSpan from "./StyledSpan";
import { ThemeProvider } from "@mui/material";
import theme from "app/theme/theme";

describe("styled span renders correctly", () => {
  it("renders a hashtag-styled span", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledSpan variant="hashtag" children="#world" />
      </ThemeProvider>
    );
    const span = screen.getByText("#world");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #702EE6");
  });

  it("renders a mention-styled span", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledSpan variant="mention" children="@developers" />
      </ThemeProvider>
    );
    const span = screen.getByText("@developers");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #07A873");
  });

  it("renders a email-styled span", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledSpan variant="email" children="boss@gmail.com" />
      </ThemeProvider>
    );
    const span = screen.getByText("boss@gmail.com");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #F58E0A");
  });

  it("renders a link-styled span", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledSpan variant="link" children="www.google.com" />
      </ThemeProvider>
    );
    const span = screen.getByText("www.google.com");
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #007FFF");
  });
});
