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
  setIsEditorFocused: React.Dispatch<React.SetStateAction<boolean>>;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

const RichTextEditor: React.FC<richTextEditorProps> = ({
  isEditorFocused,
  setIsEditorFocused,
  editorState,
  setEditorState,
}) => {
  const hasContent = editorState.getCurrentContent().hasText();
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
      >
        <AddBoxOutlinedIcon color="primary" />
        <Box flexGrow="1">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            onFocus={() => setIsEditorFocused(true)}
            editorKey={crypto.randomUUID()}
            placeholder="Type to add new task"
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
