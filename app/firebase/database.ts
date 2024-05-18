import { db } from "./firebaseConfig";
import type { task } from "app/types";
import { RawDraftContentState } from "draft-js";

import {
  collection,
  getDocsFromServer,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export const getAll = async () => {
  const data: task[] = [];
  const tasksCollectionRef = collection(db, "tasks");
  const snapshot = await getDocsFromServer(tasksCollectionRef);
  snapshot.forEach((doc) => {
    const taskData = doc.data();
    const task: task = {
      id: doc.id,
      rawContentState: taskData as RawDraftContentState,
    };
    data.push(task);
  });
  return data;
};

export const saveTask = async (key: string, { arg: task }: { arg: task }) => {
  if (!task.id) {
    await addDoc(collection(db, "tasks"), task.rawContentState);
  } else await setDoc(doc(db, "tasks", task.id), task.rawContentState);
};
