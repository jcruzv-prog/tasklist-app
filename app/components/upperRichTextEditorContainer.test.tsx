import { screen, render, fireEvent } from "@testing-library/react";
import UpperRichTextEditorContainer from "./upperRichTextEditorContainer";

describe("upper editor returns to initial empty state if Ok is clicked and editor has no content", () => {
    it("renders editor empty and no toolbar after click", () => {
        const mock = jest.fn()
      render(<UpperRichTextEditorContainer handleSaveTask={mock}/>);
      const editorWrapper = screen.getByTestId('editor-wrapper')
      fireEvent.click(editorWrapper);
      const avatar = screen.getByTestId("user-avatar");
      const OkButton = screen.getByText("Ok");
      fireEvent.click(OkButton);
      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
      expect(avatar).not.toBeInTheDocument();
    });
  });