import React, { useState } from "react";

//material components
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { RawDraftContentState } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState, Editor } from "draft-js";
import RichTextEditorContainer from "./richTextEditorContainer";

import type { task } from "app/types";
type tasklistProps = {
  tasks: task[];
  handleSaveTask: (task: task) => void;
};

const Tasklist: React.FC<tasklistProps> = ({ tasks, handleSaveTask }) => {
  return (
    <Box>
      {tasks.map((task, index) => {
        return (
          <RichTextEditorContainer
            position="taskList"
            rawContentState={task.rawContentState}
            key={index}
            handleSaveTask={handleSaveTask}
          />
        );
      })}
    </Box>
  );
};
export default Tasklist;
