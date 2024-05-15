export const metadata = {
  title: "App Router",
};

import TaskPanel from "./components/taskPanel";
export default function Page() {
  return (
    <>
      <h1>Task App</h1>
      <TaskPanel />
    </>
  );
}
