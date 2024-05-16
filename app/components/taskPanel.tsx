"use client";
import React from "react";
import RichTextEditorContainer from "./richTextEditorContainer";

type taskPanelProps = {};

const TaskPanel: React.FC<taskPanelProps> = () => {
  return (
    <div>
      <RichTextEditorContainer />
    </div>
  );
};
export default TaskPanel;
