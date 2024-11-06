import { fireEvent, render, screen } from "@testing-library/react";
import SmallActionsButtonsToolbar from "./smallActionsButtonsToolbar";

describe("actionsButtonsToolbar renders correctly", () => {
  it("renders with no actions buttons initially in top editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={false}
        editorHasContent={false}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });

  it("renders with no actions buttons initially in tasklist editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="tasklist"
        isEditorFocused={false}
        editorHasContent={true}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });

  it("renders actions buttons if text editor is focused in upper editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={true}
        editorHasContent={false}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  it("renders actions buttons if text editor is focused in tasklist editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="tasklist"
        isEditorFocused={true}
        editorHasContent={true}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  it("renders X icon button if text editor has no content in upper editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={true}
        editorHasContent={false}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={false}
      />
    );
    const xButton = screen.getByTestId("CloseOutlinedIcon");
    expect(xButton).toBeInTheDocument();
  });

  it("renders X icon button if text editor has no content in tasklist editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="tasklist"
        isEditorFocused={true}
        editorHasContent={false}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={true}
      />
    );
    const xButton = screen.getByTestId("CloseOutlinedIcon");
    expect(xButton).toBeInTheDocument();
  });

  it("renders  diskette icon button if text editor  content and have been edited in tasklist editor", () => {
    render(
      <SmallActionsButtonsToolbar
        position="tasklist"
        isEditorFocused={true}
        editorHasContent={true}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={true}
      />
    );
    const xButton = screen.getByTestId("SaveOutlinedIcon");
    expect(xButton).toBeInTheDocument();
  });

  it("renders Plus action button if text editor has  content", () => {
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={true}
        editorHasContent={true}
        handleAddTask={jest.fn}
        handleCancelTask={jest.fn}
        isTextEdited={true}
      />
    );
    const plusButton = screen.getByTestId("AddOutlinedIcon");
    expect(plusButton).toBeInTheDocument();
  });

  it("calls handleAddTask function when clicked on Add with content ", () => {
    const mockHandleAddTask = jest.fn();
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={true}
        editorHasContent={true}
        handleAddTask={mockHandleAddTask}
        handleCancelTask={jest.fn}
        isTextEdited={true}
      />
    );
    const plusButton = screen.getByTestId("AddOutlinedIcon");
    fireEvent.click(plusButton);
    expect(mockHandleAddTask).toHaveBeenCalled();
  });

  it("calls handleCancelTask function when clicked on cancel iconButton ", () => {
    const mockHandleCancelTask = jest.fn();
    render(
      <SmallActionsButtonsToolbar
        position="top"
        isEditorFocused={true}
        editorHasContent={false}
        handleAddTask={jest.fn}
        handleCancelTask={mockHandleCancelTask}
        isTextEdited={true}
      />
    );
    const plusButton = screen.getByTestId("CloseOutlinedIcon");
    fireEvent.click(plusButton);
    expect(mockHandleCancelTask).toHaveBeenCalled();
  });
});
