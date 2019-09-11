import { parse } from "path";

import { readDir } from "../src/lib/meta";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("readDir", () => {
    it("should be empty when path is invalid", () => {
      expect(readDir("invalid")).toBeEmpty();
    });

    it("should be empty when path is a file", () => {
      const file = testData.createFile("path.readDir.file.test");

      expect(readDir(file)).toBeEmpty();
    });

    it("should return files in directory", () => {
      const file = parse(testData.createFile("path.readDir.dir.test"));

      const result = readDir(testData.testDir).find(x => x.name === file.base);

      expect(result).not.toBeUndefined();
    });
  });
});
