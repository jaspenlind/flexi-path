import flexi from "../src";
import testData from "./jest/createTestData";

describe("path", () => {
  describe("write", () => {
    const root = flexi.path(testData.testDir);

    it("path should exist after write", () => {
      const path = root.append("path-write/");

      path.write();

      expect(path.exists()).toBe(true);
    });

    it("should throw when path is invalid", () => {
      expect(() => {
        flexi.path("invalid").write();
      }).toThrow();
    });

    it("should write directory when path looks like a directory", () => {
      const path = root.append("writedir/");
      path.write();
      expect(path.exists()).toBeTrue();
    });

    it("should write file when path looks like a file", () => {
      const path = root.append("write-file.js");
      path.write();
      expect(path.exists()).toBeTrue();
    });

    it("should write file and a directory when path is new", () => {
      const path = root.append("write-new-path/write-new-file.jsx");
      path.write();

      expect(path.exists()).toBeTrue();
    });

    it("should write all nested directories in the path", () => {
      const deepPath = root.append("/a/litter/deeper/").append("path");
      deepPath.write();

      expect(deepPath.exists()).toBeTrue();
    });
  });
});
