import flexi from "../../src";
import { PathType } from "../../src/types";
import testData from "../jest/createTestData";

describe("path", () => {
  describe("children", () => {
    it("can list files", () => {
      const twoFiles = 2;
      const dir = flexi
        .path(testData.testDir)
        .append("can_list_files/")
        .write();

      dir.append("file1.txt").write();
      dir.append("file2.js").write();

      expect(dir.children()).toHaveLength(twoFiles);
    });

    it("can list directories", () => {
      const threeDirectories = 3;
      const dir = flexi
        .path(testData.testDir)
        .append("can_list_directories/")
        .write();

      dir.append("sub1/").write();
      dir.append("sub2/").write();
      dir.append("sub3/").write();

      expect(dir.children()).toHaveLength(threeDirectories);
    });

    it("can list files and directories", () => {
      const twoDirectories = 2;
      const twoFiles = 2;
      const dir = flexi
        .path(testData.testDir)
        .append("can_list_files_and_directories/")
        .write();

      dir.append("sub1/").write();
      dir.append("sub2/").write();

      dir.append("file1.txt").write();
      dir.append("file2.js").write();

      const result = dir.children();

      expect(result.filter(x => x.type() === PathType.Directory)).toHaveLength(
        twoDirectories
      );
      expect(result.filter(x => x.type() === PathType.File)).toHaveLength(
        twoFiles
      );
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
      const startingWithFileCount = 2;
      const dir = flexi
        .path(testData.testDir)
        .append("can_filter_content/")
        .write();

      dir.append("file1.txt").write();
      dir.append("file2.txt").write();
      dir.append("another.txt").write();
      dir.append("dir1/").write();

      expect(dir.children(x => x.name.startsWith("file"))).toHaveLength(
        startingWithFileCount
      );
    });

    it("can walk until found", () => {
      const belowDirCount = 1;
      const dir = flexi
        .path(testData.testDir)
        .append("walk_until_found/")
        .write();

      dir.append("deep", "path", "below/").write();

      const result = dir.children(x => x.name === "below", { recursive: true });
      const [firstResult] = result;

      expect(result).toHaveLength(belowDirCount);

      expect(firstResult.name).toBe("below");
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
});
