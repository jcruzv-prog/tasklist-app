"use client";
import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

//material components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

//icons
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type richTextEditorProps = {
  isEditorFocused: boolean;
  handleOnEditorFocus: () => void;
  editorState: EditorState;
  handleEdition: (newState: EditorState) => void;
  position: "top" | "taskList";
};

const RichTextEditor: React.FC<richTextEditorProps> = ({
  isEditorFocused,
  handleOnEditorFocus,
  editorState,
  handleEdition,
  position,
}) => {
  const hasContent = editorState.getCurrentContent().hasText();
  const editorRef = React.useRef<Editor>(null);
  const FocusEditor = () => {
    handleOnEditorFocus();
    editorRef?.current?.focus();
  };

  return (
    <Paper square elevation={hasContent || isEditorFocused ? 1 : 0}>
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
        component="div"
        onClick={FocusEditor}
        data-testid="editor-wrapper"
      >
        {position === "top" ? (
          <AddBoxOutlinedIcon color="primary" />
        ) : (
          <input type="checkbox" />
        )}
        <Box flexGrow="1">
          <Editor
            editorState={editorState}
            onChange={handleEdition}
            placeholder="Type to add new task"
            ref={editorRef}
          />
        </Box>
        {isEditorFocused && (
          <Avatar
            src="/images/Foto-CV.jpg"
            alt="avatar"
            aria-roledescription="img"
            data-testid="user-avatar"
            sx={{
              width: "30px",
              height: "30px",
              opacity: hasContent ? 1 : 0.5,
            }}
          ></Avatar>
        )}
      </Box>
    </Paper>
  );
};
export default RichTextEditor;
