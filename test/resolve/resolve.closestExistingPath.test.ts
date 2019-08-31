import { join } from "path";
import flexi from "../../src";

import { closestExistingPath } from "../../src/resolve/strategies";

import testData from "../jest/createTestData";

describe("resolve", () => {
  describe("pathExists", () => {
    it("should return first directory that exists", () => {
      const subDir = testData.createDirectory("pathExistsSub/");

      const path = flexi.path(join(subDir, "non", "existing", "segments"));

      const expected = flexi.path(subDir);

      expect(
        flexi.resolve(path, closestExistingPath())
      ).toHaveMatchingMembersOf(expected);
    });

    it("should return file when it exists", () => {
      const file = testData.createFile("pathExists.file.js");

      const path = flexi.path(file);

      expect(
        flexi.resolve(path, closestExistingPath())
      ).toHaveMatchingMembersOf(path);
    });

    it("should return file independent of file extension", () => {
      const file = testData.createFile("pathExists-fileext.ts");

      const expected = flexi.path(file);

      const path = flexi.path(join(testData.testDir, "pathExists-fileext"));

      expect(
        flexi.resolve(path, closestExistingPath({ ignoreFileExtensions: true }))
      ).toHaveMatchingMembersOf(expected);
    });

    it("should return null when path is invalid", () => {
      const nonExistingPath = flexi.path("invalid");

      expect(flexi.resolve(nonExistingPath, closestExistingPath())).toBeNull();
    });

    it("should return root when path does not exist", () => {
      const nonExistingPath = flexi.path("/non/existing/path");

      expect(
        flexi.resolve(nonExistingPath, closestExistingPath())
      ).toHaveMatchingMembersOf(flexi.root());
    });
  });
});
