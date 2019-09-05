import { PathType } from "../src";
import path from "../src/lib/path";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("type", () => {
    it("should be directory when path is a directory", () => {
      expect(path(testData.testDir).type()).toBe(PathType.Directory);
    });

    it("should be file when path is a file", () => {
      const testFile = testData.createFile("path.type.test");

      expect(path(testFile).type()).toBe(PathType.File);
    });

    it("should be unknown when path is invalid", () => {
      expect(path("invalid").type()).toBe(PathType.Unknown);
    });

    it("should be directory when path looks like a directory", () => {
      expect(path("/testdir/").type()).toBe(PathType.Directory);
    });

    it("should be file when path looks like a file", () => {
      expect(path("/testdir/testfile.js").type()).toBe(PathType.File);
    });
  });
});
