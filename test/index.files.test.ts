import FlexiPath from "../src";
import flexData from "./jest/createTestData";

describe("files", () => {
  it("should be empty when path is invalid", () => {
    expect(FlexiPath("invalid").files()).toBeEmpty();
  });

  it("should be empty when path is a file", () => {
    expect(FlexiPath(flexData.testFile).files()).toBeEmpty();
  });

  it("should contain file", () => {
    expect(
      FlexiPath(flexData.testDir)
        .files()
        .map(x => x.path)
    ).toContain(flexData.testFile);
  });
});
