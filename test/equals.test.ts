import flexi from "../src";

describe("path", () => {
  describe("equals", () => {
    it("should be false path is subpath of path", () => {
      const path = flexi.path("/a/little/path/");
      const other = flexi.path("/a/little/");

      expect(path.equals(other)).toBeFalse();
    });

    it("should be false when paths are not equal", () => {
      const existing = flexi.path("existing");
      const nonExistingPath = flexi.path("nonExisting");

      expect(existing.equals(nonExistingPath)).toBeFalse();
    });

    it("should be true when paths are equal", () => {
      const path = flexi.path("path");

      expect(path.equals(path)).toBeTrue();
    });

    it("should be true when comparing without extension", () => {
      const filePath = flexi.path("/path/with/file.txt");
      const pathWithoutExt = flexi.path("/path/with/file");

      expect(
        filePath.equals(pathWithoutExt, { ignoreFileExtension: true })
      ).toBeTrue();
    });

    it("should be true when equal and one path has ending separator", () => {
      expect(flexi.path("path").equals(flexi.path("path/"))).toBeTrue();
    });
  });
});
