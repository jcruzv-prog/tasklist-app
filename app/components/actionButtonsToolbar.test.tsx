import { render, screen } from "@testing-library/react";

import ActionsButtonsToolbar from "./actionsButtonsToolbar";

describe("actionsButtonsToolbar renders correctly", () => {
  it("renders with no actions buttons initially", () => {
    render(
      <ActionsButtonsToolbar
        isScreenSmall={false}
        isEditorFocused={false}
        editorHasContent={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });

  it("renders actions buttons if text editor is focused", () => {
    render(
      <ActionsButtonsToolbar
        isScreenSmall={false}
        isEditorFocused={true}
        editorHasContent={false}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  it("renders actions buttons if text editor has content and lost focus", () => {
    render(
      <ActionsButtonsToolbar
        isScreenSmall={false}
        isEditorFocused={false}
        editorHasContent={true}
      />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  it("renders Ok action button if text editor has no content", () => {
    render(
      <ActionsButtonsToolbar
        isScreenSmall={false}
        isEditorFocused={true}
        editorHasContent={false}
      />
    );
    const okButton = screen.queryByText("Ok");
    expect(okButton).toBeInTheDocument();
  });

  it("renders Add action button if text editor has no content", () => {
    render(
      <ActionsButtonsToolbar
        isScreenSmall={false}
        isEditorFocused={true}
        editorHasContent={true}
      />
    );
    const okButton = screen.queryByText("Add");
    expect(okButton).toBeInTheDocument();
  });
});
