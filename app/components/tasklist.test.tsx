import { render, screen } from "@testing-library/react";
import Tasklist from "./tasklist";

describe("Tasklist renders correctly", () => {
  it("renders two tasks", () => {
    const mockedTasks = ["first task to insert", "this is a second task"];
    render(<Tasklist tasks={mockedTasks} />);
    const tasks = screen.getAllByTestId("task");
    expect(tasks).toHaveLength(2);
  });
});
