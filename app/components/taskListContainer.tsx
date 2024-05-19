"use client";
import React from "react";
import UpperRichTextEditorContainer from "./upperRichTextEditorContainer";
import Tasklist from "./tasklist";

//data fetching framework
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

//actions
import { getAll, saveTask } from "app/firebase/database";

//types
import type { task } from "app/types";

type taskListContainerProps = {};

const TaskListContainer: React.FC<taskListContainerProps> = () => {
  const { data: tasks, error } = useSWR("tasks", getAll, { suspense: true });
  if (error) throw Error;

  const { trigger: postTrigger, isMutating: isPostMutating } = useSWRMutation(
    "tasks",
    saveTask
  );

  const handleSaveTask = async (taskData: task) => {
    await postTrigger(taskData);
  };

  return (
    <div>
      <UpperRichTextEditorContainer handleSaveTask={handleSaveTask} />
      <Tasklist tasks={tasks} handleSaveTask={handleSaveTask} />
    </div>
  );
};
export default TaskListContainer;
