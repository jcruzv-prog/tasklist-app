import React from "react";

//material components
import Box from "@mui/material/Box";
import RichTextEditorContainer from "./richTextEditorContainer";

import type { task } from "app/types";
type tasklistProps = {
  tasks: task[];
  handleSaveTask: (task: task) => void;
};

const Tasklist: React.FC<tasklistProps> = ({ tasks, handleSaveTask }) => {
  return (
    <Box>
      {tasks.map((task) => {
        return (
          <RichTextEditorContainer
            task={task}
            key={task.id}
            handleSaveTask={handleSaveTask}
          />
        );
      })}
    </Box>
  );
};
export default Tasklist;
