"use client";
import React, { useState } from "react";
import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertFromRaw,
} from "draft-js";
import StyledSpan from "./StyledSpan";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

//material components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

//icons
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type richTextEditorProps = {};

const RichTextEditor: React.FC<richTextEditorProps> = () => {
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

  const HashtagSpan: React.FC<props> = (props) => {
    const children = props.children;
    const variant = "hashtag";
    return StyledSpan({ children, variant });
  };
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
  ]);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(emptyContentState, compositeDecorator)
  );

  const hasContent = editorState.getCurrentContent().hasText();
  const [isFocused, setIsFocused] = useState(false);

  function hashtagStrategy(contentBlock: any, callback: Function) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  function findWithRegex(regex: RegExp, contentBlock: any, callback: Function) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

  type props = {
    children: React.ReactNode;
    variant: string;
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="4rem"
      border={isFocused || hasContent ? "1px solid #D0D3D4" : "none"}
      pt="0rem"
      pb="1rem"
      px="5px"
      display="flex"
      justifyContent={"flex-end"}
      alignItems={"center"}
      columnGap={"0.5rem"}
    >
      <AddBoxOutlinedIcon
        color="primary"
        // sx={{ position: "absolute", top: "2px", left: "5px" }}
      />
      <Box flexGrow="1">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          editorKey="editor"
        />
      </Box>
      <Avatar
        src="/images/Foto-CV.jpg"
        sx={{
          width: "30px",
          height: "30px",
          opacity: hasContent ? 1 : 0.5,
          display: isFocused || hasContent ? "initial" : "none",
        }}
      ></Avatar>
      <Typography
        position="absolute"
        left="3rem"
        zIndex="-1"
        color="GrayText"
        display={hasContent ? "none" : "initial"}
      >
        Type to add new task
      </Typography>
    </Box>
  );
};
export default RichTextEditor;
