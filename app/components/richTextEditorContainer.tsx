import React, { useEffect, useState } from "react";
import RichTextEditor from "./richTextEditor";
import ActionsButtonsToolbar from "./actionsButtonsToolbar";
import SmallActionsButtonsToolbar from "./smallActionsButtonsToolbar";

import {
  EditorState,
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  ContentBlock,
} from "draft-js";
import StyledSpan from "./styledSpan";

//material components
import Container from "@mui/material/Container";

//hooks
import { useMediaQuery } from "@mui/material";

//types
import type { task } from "app/types";
import StyledButton from "./styledButton";

type richTextEditorContainerProps = {
  task: task;
  handleSaveTask: (task: task) => void;
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

const RichTextEditorContainer: React.FC<richTextEditorContainerProps> = ({
  task,
  handleSaveTask,
}) => {
  const isMoreThan1300px = useMediaQuery("(min-width:1299px)");
  const contentState = convertFromRaw(task.rawContentState);
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
  const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const MENTION_REGEX = /@\w+/g;
  const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;

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

  const buttonCompositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: ({ children }) => (
        <StyledButton children={children} variant="hashtag" />
      ),
    },
    {
      strategy: emailgStrategy,
      component: ({ children }) => (
        <StyledButton children={children} variant="email" />
      ),
    },
    {
      strategy: mentiongStrategy,
      component: ({ children }) => (
        <StyledButton children={children} variant="mention" />
      ),
    },

    {
      strategy: linkStrategy,
      component: ({ children }) => (
        <StyledButton children={children} variant="link" />
      ),
    },
  ]);

  const decorator =
    isMoreThan1300px && !isEditorFocused
      ? buttonCompositeDecorator
      : compositeDecorator;

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createWithContent(contentState, decorator)
  );

  const editorHasContent: boolean = editorState.getCurrentContent().hasText();

  useEffect(() => {
    const decorator =
      isMoreThan1300px && !isEditorFocused
        ? buttonCompositeDecorator
        : compositeDecorator;
    setEditorState((currentState) =>
      EditorState.createWithContent(currentState.getCurrentContent(), decorator)
    );
  }, [isMoreThan1300px, isEditorFocused]);

  const handleAddTask = () => {
    if (!editorState.getCurrentContent().getPlainText()) return;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    handleSaveTask({ id: task.id, rawContentState });
    setIsEditorFocused(false);
    setIsTextEdited(false);
  };

  const handleCancelTask = () => {
    setIsEditorFocused(false);
    const initialContentState = convertFromRaw(task.rawContentState);
    setEditorState(EditorState.createWithContent(initialContentState));
    setIsTextEdited(false);
  };

  const handleOnEditorFocus = () => {
    setIsEditorFocused(true);
    // const newState = EditorState.set(editorState, {
    //   decorator: compositeDecorator,
    // });
    // setEditorState(newState);
  };

  const handleEdition = (newEditorState: EditorState) => {
    if (
      editorState.getCurrentContent().getPlainText() !==
      newEditorState.getCurrentContent().getPlainText()
    ) {
      setIsTextEdited(true);
    }
    setEditorState(newEditorState);
  };

  function hashtagStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  function mentiongStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(MENTION_REGEX, contentBlock, callback);
  }

  function emailgStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(EMAILREGEX, contentBlock, callback);
  }

  function linkStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(LINKREGEX, contentBlock, callback);
  }

  function findWithRegex(
    regex: RegExp,
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void
  ) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

  return (
    <Container maxWidth="xl">
      <RichTextEditor
        isEditorFocused={isEditorFocused}
        handleOnEditorFocus={handleOnEditorFocus}
        editorState={editorState}
        handleEdition={handleEdition}
        position={"taskList"}
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
          editorHasContent={editorHasContent}
          handleAddTask={handleAddTask}
          handleCancelTask={handleCancelTask}
          position="tasklist"
          isTextEdited={isTextEdited}
        />
      )}
    </Container>
  );
};
export default RichTextEditorContainer;
