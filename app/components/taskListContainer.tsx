"use client";
import React, { useState } from "react";
import RichTextEditorContainer from "./richTextEditorContainer";
import UpperRichTextEditorContainer from "./upperRichTextEditorContainer";
import Tasklist from "./tasklist";
import {
  EditorState,
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  ContentBlock,
  RawDraftContentState,
} from "draft-js";
import { ContentState } from "react-draft-wysiwyg";

//types
import type { task } from "app/types";

type taskListContainerProps = {};

const TaskListContainer: React.FC<taskListContainerProps> = () => {
  const [tasks, setTasks] = useState<task[]>([]);

  const handleSaveTask = (taskData: task) => {
    if (taskData.id) {
      setTasks((currentTasks) => [
        ...currentTasks.filter((task) => task.id !== taskData.id),
        taskData,
      ]);
    } else {
      setTasks((currentTasks) => [...currentTasks, {id:crypto.randomUUID(),rawContentState:taskData.rawContentState}]);
    }
  };
  

  return (
    <div>
     <UpperRichTextEditorContainer  handleSaveTask={handleSaveTask} />
      <Tasklist tasks={tasks} handleSaveTask={handleSaveTask} />
    </div>
  );
};
export default TaskListContainer;
