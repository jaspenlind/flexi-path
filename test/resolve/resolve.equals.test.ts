import flexi from "../../src";
import { equals } from "../../src/lib/path/resolve/strategies";

describe("resolve", () => {
  describe("equals", () => {
    it("should be empty when path is subpath of path", () => {
      const path = flexi.path("/a/little/path/");
      const expected = flexi.path("/a/little/");

      expect(flexi.resolve(path, equals(expected))).toBe(flexi.empty());
    });

    it("should be empty when paths are not equal", () => {
      const existing = flexi.path("existing");
      const nonExistingPath = flexi.path("nonExisting");

      expect(flexi.resolve(existing, equals(nonExistingPath))).toBe(
        flexi.empty()
      );
    });

    it("should return path when equal", () => {
      const path = flexi.path("path");

      expect(flexi.resolve(path, equals(path))).toHaveMatchingMembersOf(path);
    });

    it("should return path to file regardless of file extension", () => {
      const filePath = flexi.path("/path/with/file.txt");
      const pathWithoutExt = flexi.path("/path/with/file");

      expect(
        flexi.resolve(
          filePath,
          equals(pathWithoutExt, { ignoreFileExtensions: true })
        )
      ).toHaveMatchingMembersOf(filePath);
    });
  });
});
