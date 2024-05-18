import { screen, render, fireEvent } from "@testing-library/react";
import UpperRichTextEditorContainer from "./upperRichTextEditorContainer";
import mediaQuery from "css-mediaquery";

describe("upper editor returns to initial empty state if Ok is clicked and editor has no content", () => {
  beforeAll(() => {
    function createMatchMedia(width: number) {
      return (query: string): MediaQueryList => ({
        matches: mediaQuery.match(query, { width }) as boolean,
        media: "",
        addListener: () => {},
        removeListener: () => {},
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      });
    }
    // mock matchMedia for useMediaQuery to work properly
    window.innerWidth = 1400;
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  it("renders editor empty and no toolbar after click ok with empty editor", () => {
    const mock = jest.fn();
    render(<UpperRichTextEditorContainer handleSaveTask={mock} />);
    const editorWrapper = screen.getByTestId("editor-wrapper");
    fireEvent.click(editorWrapper);
    const avatar = screen.getByTestId("user-avatar");
    const OkButton = screen.getByText("Ok");
    fireEvent.click(OkButton);
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
    expect(avatar).not.toBeInTheDocument();
  });

  it("renders editor empty and no toolbar after click cancel ", () => {
    const mock = jest.fn();
    render(<UpperRichTextEditorContainer handleSaveTask={mock} />);
    const editorWrapper = screen.getByTestId("editor-wrapper");
    fireEvent.click(editorWrapper);
    const avatar = screen.getByTestId("user-avatar");
    const CancelButton = screen.getByText("Cancel");
    fireEvent.click(CancelButton);
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
    expect(avatar).not.toBeInTheDocument();
  });
});
