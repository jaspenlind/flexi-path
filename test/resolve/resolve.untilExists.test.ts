import { join } from "path";
import flexi, { strategies } from "../../src";

import testData from "../jest/createTestData";

describe("resolve", () => {
  describe("pathExists", () => {
    it("should return first directory that exists", () => {
      const subDir = testData.createDirectory("pathExistsSub/");

      const path = flexi.path(join(subDir, "non", "existing", "segments"));

      const expected = flexi.path(subDir);

      expect(
        flexi.resolve(path, strategies.untilExists())
      ).toHaveMatchingMembersOf(expected);
    });

    it("should return file when it exists", () => {
      const file = testData.createFile("pathExists.file.js");

      const path = flexi.path(file);

      expect(
        flexi.resolve(path, strategies.untilExists())
      ).toHaveMatchingMembersOf(path);
    });

    it("should return file independent of file extension", () => {
      testData.createFile("pathExists-fileext.ts");

      const path = flexi.path(join(testData.testDir, "pathExists-fileext"));

      expect(
        flexi.resolve(
          path,
          strategies.untilExists({ ignoreFileExtensions: true })
        )
      ).toHaveMatchingMembersOf(path);
    });

    it("should be empty when path is invalid", () => {
      const nonExistingPath = flexi.path("invalid");

      expect(flexi.resolve(nonExistingPath, strategies.untilExists())).toBe(
        flexi.empty()
      );
    });

    it("should return root when path does not exist", () => {
      const nonExistingPath = flexi.path("/non/existing/path");

      expect(
        flexi.resolve(nonExistingPath, strategies.untilExists())
      ).toHaveMatchingMembersOf(flexi.root());
    });
  });
});
