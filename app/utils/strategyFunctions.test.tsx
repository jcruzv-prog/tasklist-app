import { findWithRegex } from "./strategyFunctions";

const MENTION_REGEX = /@\w+/g;
describe("Regex matcher function works correctly", () => {
  it("calls callback function with correct range text match", () => {
    const mockText = "@some";
    const mockedCallBackFunction = jest.fn();
    findWithRegex(MENTION_REGEX, mockText, mockedCallBackFunction);
    expect(mockedCallBackFunction).toHaveBeenCalledWith(0, 5);
  });
});
