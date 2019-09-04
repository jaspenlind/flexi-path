import flexi from "../../src";
import strategies from "../../src/lib/resolve/strategies";

describe("resolve", () => {
  describe("parentUntil", () => {
    it("should return parent matching condition", () => {
      const path = flexi.path("some/arbitrary/path");

      const result = flexi.resolve(
        path,
        strategies.parentUntil(x => x.name === "arbitrary")
      );

      expect(result && result.path).toBe("some/arbitrary");
    });

    it("should be empty when empty", () => {
      const empty = flexi.empty();

      expect(
        flexi.resolve(empty, strategies.parentUntil(x => x.path === "notempty"))
      ).toBe(empty);
    });

    it("should be empty when nothing matches", () => {
      const path = flexi.path("path");

      expect(
        flexi.resolve(path, strategies.parentUntil(x => x.name === "nothing"))
      ).toBe(flexi.empty());
    });

    it("should be root when condition is root", () => {
      const path = flexi.path("/some/path");

      expect(flexi.resolve(path, strategies.parentUntil(x => x.isRoot()))).toBe(
        flexi.root()
      );
    });

    it("should be empty when nothing matches and path has no root", () => {
      const path = flexi.path("path/without/root");

      expect(
        flexi.resolve(path, strategies.parentUntil(x => x.name === "nothing"))
      ).toBe(flexi.empty());
    });
  });
});
