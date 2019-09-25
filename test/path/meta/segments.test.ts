import flexi from "../../../src";

describe("path", () => {
  describe("meta", () => {
    describe("segments", () => {
      it("should return all segments of a path", () => {
        const path = flexi.path("segmented").append("path");

        const [first, second] = path.segments;

        expect(first).toBe("segmented");
        expect(second).toBe("path");
      });

      it("should be empty for empty path", () => {
        expect(flexi.empty().segments).toBeEmpty();
      });

      it("should be root for root path", () => {
        const [root] = flexi.root().segments;

        expect(flexi.isRoot(root)).toBeTrue();
      });
    });
  });
});
