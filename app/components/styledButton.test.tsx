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
    const button = screen.getByRole("button")
    expect(span).toBeInTheDocument();
    expect(span).toHaveStyle("color: #702EE6");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background: #ADF0D9");
  });

//   it("renders a mention-styled button", () => {
//     render(
//       <ThemeProvider theme={theme}>
//         <StyledButton variant="mention" children="developers" />
//       </ThemeProvider>
//     );
//     const span = screen.getByText("developers");
//     const button = screen.getByRole("button")
//     expect(span).toBeInTheDocument();
//     expect(span).toHaveStyle("color: #07A873");
//     expect(button).toBeInTheDocument();
//     expect(button).toHaveStyle("background-color: #ADF0D9");
//   });
});