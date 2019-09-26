import flexi from "../../src";

describe("path", () => {
  describe("pop", () => {
    it("should return the last segment of the path", () => {
      const lastSegment = flexi.path("lastSegment");
      const path = flexi.path("some/path").append(lastSegment);

      expect(path.pop().path).toBe(lastSegment.path);
    });

    it("should be empty when path is empty", () => {
      expect(flexi.empty().pop()).toBe(flexi.empty());
    });

    it("should be root when path is root", () => {
      expect(flexi.root().pop()).toBe(flexi.root());
    });
  });
});
