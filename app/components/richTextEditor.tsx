"use client";
import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertFromRaw,
} from "draft-js";
import StyledSpan from "./styledSpan";
import "draft-js/dist/Draft.css";

//material components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

//icons
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

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

type richTextEditorProps = {
  isEditorFocused: boolean;
  setIsEditorFocused: React.Dispatch<React.SetStateAction<boolean>>;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

const RichTextEditor: React.FC<richTextEditorProps> = ({}) => {
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
  const HASHTAG_REGEX = /^\#[\w\u0590-\u05ff]+/g;
  const MENTION_REGEX = /^@\w+/g;
  const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const LINKREGEX = /^https?:\/\/(\w+\.)(\w+\.?)+|^www(\.\w+)(\.\w+)+/g;

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

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(compositeDecorator)
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
    <Paper square elevation={editorHasContent || isEditorFocused ? 1 : 0}>
      <Box
        position="relative"
        width="100%"
        height="4rem"
        pt="0rem"
        pb="1rem"
        px="5px"
        display="flex"
        justifyContent={"flex-end"}
        alignItems={"center"}
        columnGap={"0.5rem"}
      >
        <AddBoxOutlinedIcon color="primary" />
        <Box flexGrow="1">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            onBlur={() => setIsEditorFocused(false)}
            onFocus={() => setIsEditorFocused(true)}
            editorKey="some"
          />
        </Box>
        <Avatar
          src="/images/Foto-CV.jpg"
          sx={{
            width: "30px",
            height: "30px",
            opacity: editorHasContent ? 1 : 0.5,
            display: isEditorFocused || editorHasContent ? "initial" : "none",
          }}
        ></Avatar>
        <Typography
          position="absolute"
          left="3rem"
          color="GrayText"
          display={editorHasContent ? "none" : "initial"}
        >
          Type to add new task
        </Typography>
      </Box>
    </Paper>
  );
};
export default RichTextEditor;
