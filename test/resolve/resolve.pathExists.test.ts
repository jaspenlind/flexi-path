import { join } from "path";
import flexi from "../../src";

import { pathExists } from "../../src/resolve/strategies";

import testData from "../jest/createTestData";

describe("resolve", () => {
  describe("pathExists", () => {
    it("should return first path that exists", () => {
      const subDir = testData.createDirectory("pathExistsSub/");

      const path = flexi.path(join(subDir, "non", "existing", "segments"));

      const expected = flexi.path(subDir);

      expect(flexi.resolve(path, pathExists())).toHaveMatchingMembersOf(
        expected
      );
    });

    it("should return null when path is invalid", () => {
      const nonExistingPath = flexi.path("invalid");

      expect(flexi.resolve(nonExistingPath, pathExists())).toBeNull();
    });

    it("should return root when path does not exist", () => {
      const nonExistingPath = flexi.path("/non/existing/path");

      expect(
        flexi.resolve(nonExistingPath, pathExists())
      ).toHaveMatchingMembersOf(flexi.root());
    });
  });
});
