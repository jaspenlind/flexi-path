import { parse } from "path";
import { path } from "../src";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("readDir", () => {
    it("should be empty when path is invalid", () => {
      expect(path("invalid").readDir()).toBeEmpty();
    });

    it("should be empty when path is a file", () => {
      const file = testData.createFile("path.readDir.file.test");

      expect(path(file).readDir()).toBeEmpty();
    });

    it("should return files in directory", () => {
      const file = parse(testData.createFile("path.readDir.dir.test"));

      const result = path(testData.testDir)
        .readDir()
        .find(x => x.name === file.base);

      expect(result).not.toBeUndefined();
    });
  });
});
