import { screen, render, fireEvent } from "@testing-library/react";
import RichTextEditorContainer from "./richTextEditorContainer";
import mediaQuery from "css-mediaquery";

describe("editor renders correctly", () => {
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
  const mockTask = {
    id: "some-id",
    rawContentState: {
      entityMap: {},
      blocks: [
        {
          text: "some",
          key: "foo",
          type: "unstyled",
          entityRanges: [],
          depth: 0,
          inlineStyleRanges: [],
        },
      ],
    },
  };
  it("renders editor toolbar and avatar after click", () => {
    render(
      <RichTextEditorContainer handleSaveTask={jest.fn} task={mockTask} />
    );
    const editorWrapper = screen.getByTestId("editor-wrapper");
    fireEvent.click(editorWrapper);
    const avatar = screen.getByTestId("user-avatar");
    const buttons = screen.queryAllByRole("button");
    expect(avatar).toBeInTheDocument();
    expect(buttons).toHaveLength(7);
  });

  it("editor returns to initial state after saving a task", () => {
    render(
      <RichTextEditorContainer handleSaveTask={jest.fn} task={mockTask} />
    );
    const editorWrapper = screen.getByTestId("editor-wrapper");
    fireEvent.click(editorWrapper);
    const saveButton = screen.getByText("Add");
    const avatar = screen.getByTestId("user-avatar");
    fireEvent.click(saveButton);
    const buttons = screen.queryAllByRole("button");
    expect(avatar).not.toBeInTheDocument();
    expect(buttons).toHaveLength(0);
  });

  it("editor returns to initial state canceling edition of a task", () => {
    render(
      <RichTextEditorContainer handleSaveTask={jest.fn} task={mockTask} />
    );
    const editorWrapper = screen.getByTestId("editor-wrapper");
    fireEvent.click(editorWrapper);
    const saveButton = screen.getByText("Cancel");
    const avatar = screen.getByTestId("user-avatar");
    fireEvent.click(saveButton);
    const buttons = screen.queryAllByRole("button");
    expect(avatar).not.toBeInTheDocument();
    expect(buttons).toHaveLength(0);
  });
});
