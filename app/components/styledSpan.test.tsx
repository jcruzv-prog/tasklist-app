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
});
