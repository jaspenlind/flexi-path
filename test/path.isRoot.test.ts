import flexi, { path } from "../src";

describe("path", () => {
  describe("isRoot", () => {
    it("should be true when path is slash", () => {
      const root = flexi.path("/");

      expect(path(root).isRoot()).toBeTrue();
    });

    it("should be true when path is flexi.root()", () => {
      expect(path(flexi.root()).isRoot()).toBeTrue();
    });

    it("should be false when path is not root", () => {
      expect(path("/deeper/path").isRoot()).toBeFalse();
    });
  });
});
