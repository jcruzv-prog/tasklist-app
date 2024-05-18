"use client";
import React, { useState } from "react";
import RichTextEditorContainer from "./richTextEditorContainer";
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

  const emptyRawContentState = {
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
  };

  return (
    <div>
      <RichTextEditorContainer
        task={{rawContentState:emptyRawContentState}}
        handleSaveTask={handleSaveTask}
        position="top"
      />
      <Tasklist tasks={tasks} handleSaveTask={handleSaveTask} />
    </div>
  );
};
export default TaskListContainer;
