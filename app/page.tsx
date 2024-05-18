export const metadata = {
  title: "App Router",
};
import TaskListContainer from "./components/taskListContainer";
export default function Page() {
  return (
    <>
      <h1>Task App</h1>
      <TaskListContainer />
    </>
  );
}
