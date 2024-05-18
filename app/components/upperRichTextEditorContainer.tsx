import React, { useState } from "react";

//components
import RichTextEditor from "./richTextEditor";
import ActionsButtonsToolbar from "./actionsButtonsToolbar";
import SmallActionsButtonsToolbar from "./smallActionsButtonsToolbar";

//utils
import {
  hashtagStrategy,
  emailgStrategy,
  mentiongStrategy,
  linkStrategy,
} from "../utils/strategyFunctions";

import {
  EditorState,
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import StyledSpan from "./styledSpan";

//material components
import Container from "@mui/material/Container";

//hooks
import { useMediaQuery } from "@mui/material";

//types
import type { task } from "app/types";

type richTextEditorContainerProps = {
  handleSaveTask: (task: task) => void;
};

type spanProps = {
  children: React.ReactNode;
  variant: string;
};

const emptyRawContentState = {
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
};

const UpperRichTextEditorContainer: React.FC<richTextEditorContainerProps> = ({
  handleSaveTask,
}) => {
  const isMoreThan1300px = useMediaQuery("(min-width:1299px)");

  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [isTextEdited, setIsTextEdited] = useState(false);

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: ({ children }) => (
        <StyledSpan children={children} variant="hashtag" />
      ),
    },
    {
      strategy: emailgStrategy,
      component: ({ children }) => (
        <StyledSpan children={children} variant="email" />
      ),
    },
    {
      strategy: mentiongStrategy,
      component: ({ children }) => (
        <StyledSpan children={children} variant="mention" />
      ),
    },

    {
      strategy: linkStrategy,
      component: ({ children }) => (
        <StyledSpan children={children} variant="link" />
      ),
    },
  ]);

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createWithContent(
      convertFromRaw(emptyRawContentState),
      compositeDecorator
    )
  );

  const handleAddTask = () => {
    setIsEditorFocused(false);
    if (!editorState.getCurrentContent().getPlainText()) return;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    handleSaveTask({ rawContentState });
    const emptyContentState = convertFromRaw(emptyRawContentState);
    setEditorState(
      EditorState.createWithContent(emptyContentState, compositeDecorator)
    );
  };

  const handleEdition = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    setIsTextEdited(true);
  };
  const handleCancelTask = () => {
    const emptyContentState = convertFromRaw(emptyRawContentState);
    setEditorState(
      EditorState.createWithContent(emptyContentState, compositeDecorator)
    );
    setIsEditorFocused(false);
  };

  const handleOnEditorFocus = () => {
    setIsEditorFocused(true);
    const newState = EditorState.set(editorState, {
      decorator: compositeDecorator,
    });
    setEditorState(newState);
  };

  const editorHasContent: boolean = editorState.getCurrentContent().hasText();

  return (
    <Container maxWidth="xl">
      <RichTextEditor
        isEditorFocused={isEditorFocused}
        handleOnEditorFocus={handleOnEditorFocus}
        editorState={editorState}
        handleEdition={handleEdition}
        position={"top"}
      />
      {isMoreThan1300px ? (
        <ActionsButtonsToolbar
          isEditorFocused={isEditorFocused}
          editorHasContent={editorHasContent}
          handleAddTask={handleAddTask}
          handleCancelTask={handleCancelTask}
        />
      ) : (
        <SmallActionsButtonsToolbar
          isEditorFocused={isEditorFocused}
          position="top"
          editorHasContent={editorHasContent}
          handleAddTask={handleAddTask}
          handleCancelTask={handleCancelTask}
          isTextEdited={isTextEdited}
        />
      )}
    </Container>
  );
};
export default UpperRichTextEditorContainer;
