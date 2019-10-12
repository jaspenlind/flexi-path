import flexi from "../../../src";
import { testDir } from "../../jest/createTestData";

describe("path", () => {
  describe("meta", () => {
    describe("exists", () => {
      it("should be true for path that exists", () => {
        const existingPath = flexi
          .path(testDir)
          .append("exists_true_for_existing_path/")
          .write();

        expect(existingPath.exists()).toBeTrue();
      });

      it("should be true when directory exists and path has no trailing slash", () => {
        flexi
          .path(testDir)
          .append("exists_true_for_existing_path_no_trailing/")
          .write();

        const withoutSlash = flexi.path(testDir).append("exists_true_for_existing_path_no_trailing");

        expect(withoutSlash.exists()).toBeTrue();
      });

      it("should be false for path that doesn't exist", () => {
        const nonExistingPath = flexi.path(testDir).append("exists_non_existing_path/");

        expect(nonExistingPath.exists()).toBeFalse();
      });

      it("should be false for path that doesn't exist without trailing slash", () => {
        const nonExistingPath = flexi.path(testDir).append("exists_non_existing_path");

        expect(nonExistingPath.exists()).toBeFalse();
      });

      it("should be true for file that exists", () => {
        const existingFile = flexi
          .path(testDir)
          .append("exists_file_exists.js")
          .write();

        expect(existingFile.exists()).toBeTrue();
      });

      it("should be false for file that doesn't exist", () => {
        const nonExistingFile = flexi.path(testDir).append("exists_non_existing_file.js");

        expect(nonExistingFile.exists()).toBeFalse();
      });

      it("should be false for empty path", () => {
        expect(flexi.empty().exists()).toBeFalse();
      });

      it("should be true for root path", () => {
        expect(flexi.root().exists()).toBeTrue();
      });

      it("should be false for invalid path", () => {
        expect(flexi.path("invalid").exists()).toBeFalse();
      });
    });
  });
});
