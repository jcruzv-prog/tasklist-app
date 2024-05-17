import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import ActionsButtonsToolbar from "./actionsButtonsToolbar";
import Container from "@mui/material/Container";

import {
  EditorState,
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  ContentBlock,
} from "draft-js";
import StyledSpan from "./styledSpan";
import Tasklist from "./tasklist";
import { ContentState, RawDraftContentState } from "react-draft-wysiwyg";

//types
import type { task } from "app/types";

type richTextEditorContainerProps = {
  rawContentState: RawDraftContentState;
  position: "taskList" | "top";
  handleSaveTask: (task: task) => void;
};

type spanProps = {
  children: React.ReactNode;
  variant: string;
};

const HashtagSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "hashtag";
  return StyledSpan({ children, variant });
};

const MentionSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "mention";
  return StyledSpan({ children, variant });
};

const EmailSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "email";
  return StyledSpan({ children, variant });
};

const LinkSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "link";
  return StyledSpan({ children, variant });
};

const RichTextEditorContainer: React.FC<richTextEditorContainerProps> = ({
  rawContentState,
  handleSaveTask,
  position,
}) => {
  const emptyContentState = convertFromRaw({
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
  });
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
  const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const MENTION_REGEX = /@\w+/g;
  const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
    {
      strategy: emailgStrategy,
      component: EmailSpan,
    },
    {
      strategy: mentiongStrategy,
      component: MentionSpan,
    },

    {
      strategy: linkStrategy,
      component: LinkSpan,
    },
  ]);

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createWithContent(emptyContentState, compositeDecorator)
  );

  const [tasks, setTasks] = useState<RawDraftContentState[]>([]);

  const handleAddTask = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    setIsEditorFocused(false);
    setEditorState(
      EditorState.createWithContent(emptyContentState, compositeDecorator)
    );

    handleSaveTask({ rawContentState });
  };

  const handleCancelTask = () => {
    const initialContentState = convertFromRaw(rawContentState);
    setEditorState(EditorState.createWithContent(initialContentState));
    setIsEditorFocused(false);
  };

  const editorHasContent: boolean = editorState.getCurrentContent().hasText();

  // console.log(editorState.getCurrentContent().getPlainText("\u0001"));
  // console.log(editorState.getCurrentContent());
  const [isEditorFocused, setIsEditorFocused] = useState(false);

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
        setIsEditorFocused={setIsEditorFocused}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionsButtonsToolbar
        isEditorFocused={isEditorFocused}
        editorHasContent={editorHasContent}
        handleAddTask={handleAddTask}
        handleCancelTask={handleCancelTask}
      />
    </Container>
  );
};
export default RichTextEditorContainer;
