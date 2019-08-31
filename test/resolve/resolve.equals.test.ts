import flexi from "../../src";
import { equals } from "../../src/resolve/strategies";

describe("resolve", () => {
  describe("equals", () => {
    it("should return null when path is subpath of path", () => {
      const path = flexi.path("/a/little/path/");
      const expected = flexi.path("/a/little/");

      const result = flexi.resolve(path, equals(expected));

      console.log(result && result.path);
      expect(result).toBeNull();
    });

    it("should return null when paths are not equal", () => {
      const existing = flexi.path("existing");
      const nonExistingPath = flexi.path("nonExisting");

      expect(flexi.resolve(existing, equals(nonExistingPath))).toBeNull();
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
