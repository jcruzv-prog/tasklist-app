import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import TaskPanel from "./taskPanel";

describe("taskPanel renders correctly", () => {
  it("renders with no actions buttons initially", () => {
    render(<TaskPanel />);
    const taskInput = screen.getByRole("textbox");
    const buttons = screen.queryAllByRole("button");
    expect(taskInput).toBeInTheDocument();
    expect(buttons).toHaveLength(0);
  });
});
