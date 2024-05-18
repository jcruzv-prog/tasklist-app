import { render, screen } from "@testing-library/react";
import Tasklist from "./tasklist";

const mockTaskList = [
  {
    id: "some-id",
    rawContentState: {
      entityMap: {},
      blocks: [
        {
          text: "some",
          key: "foo",
          type: "unstyled",
          entityRanges: [],
          depth: 0,
          inlineStyleRanges: [],
        },
      ],
    },
  },
  {
    id: "second-id",
    rawContentState: {
      entityMap: {},
      blocks: [
        {
          text: "more",
          key: "foo",
          type: "unstyled",
          entityRanges: [],
          depth: 0,
          inlineStyleRanges: [],
        },
      ],
    },
  },
];
describe("Tasklist renders correctly", () => {
  it("renders two tasks", () => {
    render(<Tasklist tasks={mockTaskList} handleSaveTask={jest.fn} />);
    const tasks = screen.getAllByTestId("editor-wrapper");
    expect(tasks).toHaveLength(2);
  });
});
