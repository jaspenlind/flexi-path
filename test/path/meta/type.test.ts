import flexi, { PathType } from "../../../src";
import path from "../../../src/lib/path";
import testData from "../../jest/createTestData";

describe("path", () => {
  describe("meta", () => {
    describe("type", () => {
      it("should be directory when path is a directory", () => {
        expect(path(testData.testDir).type()).toBe(PathType.Directory);
      });

      it("should be file when path is a file", () => {
        const file = flexi
          .path(testData.testDir)
          .append("should_be_file_when_path_is_a_file.js")
          .write();

        expect(file.type()).toBe(PathType.File);
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
});
