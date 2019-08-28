import { PathType, path } from "../src";
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

    it("should be unknown when path does not exist", () => {
      expect(path("unknown").type()).toBe(PathType.Unknown);
    });
  });
});
