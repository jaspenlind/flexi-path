import flexi from "../src";
import subDirectories from "../src/subDirectories";
import testData from "./jest/createTestData";

describe("subDirectories", () => {
  it("should contain subdirectory", () => {
    const subDirectory = testData.createDirectory("subDirectory");

    expect(subDirectories(testData.testDir)().map(x => x.path)).toContain(
      subDirectory
    );
  });

  it("should be empty when path is file", () => {
    const testFile = testData.createFile("subDirectories.test");
    expect(subDirectories(testFile)().map(x => x.path)).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    expect(subDirectories("invalid")()).toBeEmpty();
  });

  describe("when passing name", () => {
    it("should have subdirectory with parent", () => {
      const parent = flexi.path("root/");
      const sub = parent.subDirectories("sub");

      expect(sub.parent()).toHaveMatchingMembersOf(parent);
    });
  });
});
