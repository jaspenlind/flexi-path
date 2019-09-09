import flexi from "../src";
import subDirectories from "../src/lib/subDirectories";
import testData from "./jest/createTestData";

describe("subDirectories", () => {
  it("should contain subdirectory", () => {
    const subDirectory = testData.createDirectory("subDirectory");

    expect(subDirectories(testData.testDir)().map(x => x.path)).toContain(
      subDirectory
    );
  });

  it("can get directories when path is flexi", () => {
    expect(subDirectories(flexi.path("invalid"))()).toBeEmpty();
  });

  it("should be empty when path is file", () => {
    const testFile = flexi
      .path({
        basePath: testData.testDir,
        path: "subdirectories_empty_when_path_is_file.js"
      })
      .write();

    expect(subDirectories(testFile)().map(x => x.path)).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    expect(subDirectories("invalid")()).toBeEmpty();
  });

  it("should not contain files", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("subdirectories_should_not_contain_files/")
      .write();

    dir.append("file.txt").write();

    expect(dir.subDirectories()).toBeEmpty();
    expect(dir.subDirectories(x => true)).toBeEmpty();
  });
});
