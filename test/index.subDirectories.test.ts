import FlexiPath from "../src";
import testData from "./jest/createTestData";

describe("subDirectories", () => {
  it("should contain subdirectory", () => {
    const subDirectory = testData.createDirectory("subDirectory");

    expect(
      FlexiPath(testData.testDir)
        .subDirectories()
        .map(x => x.path)
    ).toContain(subDirectory);
  });

  it("should be empty when path is file", () => {
    expect(
      FlexiPath(testData.testFile)
        .subDirectories()
        .map(x => x.path)
    ).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    expect(FlexiPath("invalid").subDirectories()).toBeEmpty();
  });

  describe("when passing name", () => {
    it("should have subdirectory with parent", () => {
      const parent = FlexiPath("root/");
      const sub = parent.subDirectories("sub");

      expect(sub.parent()).toHaveMatchingMembersOf(parent);
    });
  });
});
