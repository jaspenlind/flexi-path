import flexi, { PathType } from "../src";
import testData from "./jest/createTestData";

describe("children", () => {
  it("can list files", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("can_list_files/")
      .write();

    dir.append("file1.txt").write();
    dir.append("file2.js").write();

    expect(dir.children()).toHaveLength(2);
  });

  it("can list directories", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("can_list_directories/")
      .write();

    dir.append("sub1/").write();
    dir.append("sub2/").write();
    dir.append("sub3/").write();

    expect(dir.children()).toHaveLength(3);
  });

  it("can list files and directories", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("can_list_files_and_directories/")
      .write();

    dir.append("sub1/").write();
    dir.append("sub2/").write();

    dir.append("file1.txt").write();
    dir.append("file2.js").write();

    const result = dir.children();

    expect(result.filter(x => x.type() === PathType.Directory)).toHaveLength(2);
    expect(result.filter(x => x.type() === PathType.File)).toHaveLength(2);
  });

  it("should be empty when directory is empty", () => {
    const empty = flexi
      .path(testData.testDir)
      .append("empty_when_directory_is_empty")
      .write();

    expect(empty.children()).toBeEmpty();
  });

  it("should be empty when path is file", () => {
    const file = flexi
      .path(testData.testDir)
      .append("empty_when_path_is_file.js")
      .write();

    expect(file.children()).toBeEmpty();
  });

  it("should be empty when path is invalid", () => {
    const invalid = flexi.path("invalid");

    expect(invalid.children()).toBeEmpty();
  });

  it("can filter content", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("can_filter_content/")
      .write();

    dir.append("file1.txt").write();
    dir.append("file2.txt").write();
    dir.append("another.txt").write();
    dir.append("dir1/").write();

    expect(dir.children(x => x.name.startsWith("file"))).toHaveLength(2);
  });

  it("can walk until found", () => {
    test.todo("implement walking functionallity");
    // const dir = flexi
    //   .path(testData.testDir)
    //   .append("walk_until_found/")
    //   .write();

    // dir.append("deep", "path", "below/").write();

    // const result = dir.children(x => x.name === "below", { recursive: true });

    // expect(result).toHaveLength(1);

    // expect(result[0].name).toBe("below");
  });

  it("should be empty when walked and not found", () => {
    const dir = flexi
      .path(testData.testDir)
      .append("empty_when_walked_and_not_found/")
      .write();

    dir.append("deep", "path", "below/").write();

    const result = dir.children(x => x.name === "invalid");

    expect(result).toBeEmpty();
  });
});
