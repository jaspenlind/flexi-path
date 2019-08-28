import { type } from "../src/path";
import { PathType } from "../src/types";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("type", () => {
    it("should be directory when path is a directory", () => {
      expect(type(testData.testDir)).toBe(PathType.Directory);
    });

    it("should be file when path is a file", () => {
      const testFile = testData.createFile("path.type.test");

      expect(type(testFile)).toBe(PathType.File);
    });

    it("should be unknown when path does not exist", () => {
      expect(type("unknown")).toBe(PathType.Unknown);
    });
  });
});
