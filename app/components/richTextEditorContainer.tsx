import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import ActionsButtonsToolbar from "./actionsButtonsToolbar";
import Container from "@mui/material/Container";

import { EditorState, CompositeDecorator, convertFromRaw } from "draft-js";
import StyledSpan from "./styledSpan";

type richTextEditorContainerProps = {};

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

const RichTextEditorContainer: React.FC<richTextEditorContainerProps> = () => {
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
  const MENTION_REGEX = /@\w+/g;
  const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
    {
      strategy: mentiongStrategy,
      component: MentionSpan,
    },
    {
      strategy: emailgStrategy,
      component: EmailSpan,
    },
    {
      strategy: linkStrategy,
      component: LinkSpan,
    },
  ]);

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createWithContent(emptyContentState, compositeDecorator)
  );
  const editorHasContent: boolean = editorState.getCurrentContent().hasText();

  console.log(editorState.getCurrentContent().getPlainText("\u0001"));
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  function hashtagStrategy(contentBlock: any, callback: Function) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  function mentiongStrategy(contentBlock: any, callback: Function) {
    findWithRegex(MENTION_REGEX, contentBlock, callback);
  }

  function emailgStrategy(contentBlock: any, callback: Function) {
    findWithRegex(EMAILREGEX, contentBlock, callback);
  }

  function linkStrategy(contentBlock: any, callback: Function) {
    findWithRegex(LINKREGEX, contentBlock, callback);
  }

  function findWithRegex(regex: RegExp, contentBlock: any, callback: Function) {
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
      />
    </Container>
  );
};
export default RichTextEditorContainer;
