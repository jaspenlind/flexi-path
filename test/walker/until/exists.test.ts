import flexi, { until } from "../../../src";
import testData from "../../jest/createTestData";

describe("walker", () => {
  describe("until.exists", () => {
    it("should return first directory that exists", () => {
      const subDir = flexi
        .path(testData.testDir)
        .append("pathExistsSub/")
        .write();

      const path = subDir.append("non", "existing", "segments");

      expect(flexi.walk.back(path, { until: until.exists() }).result.path).toBe(
        subDir.path
      );
    });

    it("should return file when it exists", () => {
      const file = testData.createFile("pathExists.file.js");

      const path = flexi.path(file);

      expect(
        flexi.walk.back(path, { until: until.exists() }).result
      ).toHaveMatchingMembersOf(path);
    });

    it("should return file independent of file extension", () => {
      flexi
        .path({ basePath: testData.testDir, path: "pathExists-fileext.ts" })
        .write();

      const pathWithoutExt = flexi
        .path(testData.testDir)
        .append("pathExists-fileext");

      expect(
        flexi.walk.back(pathWithoutExt, {
          until: until.exists({ ignoreFileExtensions: true })
        }).result
      ).toHaveMatchingMembersOf(pathWithoutExt);
    });

    it("should return directory independent of file extension", () => {
      const existingPath = flexi
        .path(testData.testDir)
        .append("until-exists-ignore-ext/")
        .write();

      const missingPath = existingPath.append("some/missing/path");

      expect(
        flexi.walk.back(missingPath, {
          until: until.exists({ ignoreFileExtensions: true })
        }).result.path
      ).toBe(existingPath.path);
    });

    it("should be empty when path is invalid", () => {
      const nonExistingPath = flexi.path("invalid");

      expect(
        flexi.walk.back(nonExistingPath, { until: until.exists() }).result
      ).toBe(flexi.empty());
    });

    it("should be root when path below does not exist", () => {
      const nonExistingPath = flexi.path("/non/existing/path");

      expect(
        flexi.walk.back(nonExistingPath, { until: until.exists() }).result
      ).toBe(flexi.root());
    });
  });
});
