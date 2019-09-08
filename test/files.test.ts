import flexi from "../src";
import flexData from "./jest/createTestData";

describe("files", () => {
  it("should be empty when path is invalid", () => {
    expect(flexi.path("invalid").files()).toBeEmpty();
  });

  it("should be empty when path is a file", () => {
    const testFile = flexData.createFile("files.test.empty");

    expect(flexi.path(testFile).files()).toBeEmpty();
  });

  it("should contain file", () => {
    const testFile = flexData.createFile("files.test.contain");
    expect(
      flexi
        .path(flexData.testDir)
        .files()
        .map(x => x.path)
    ).toContain(testFile);
  });

  it("should not contain subdirectories", () => {
    const dir = flexi
      .path(flexData.testDir)
      .append("files_should_not_contain_subdirectories/")
      .write();

    dir.append("subDir/").write();

    expect(dir.files()).toBeEmpty();
    expect(dir.files(x => true)).toBeEmpty();
  });
});
