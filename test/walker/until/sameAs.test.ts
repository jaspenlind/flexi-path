import { flexi, walker } from "../../../src/lib";

describe("walker", () => {
  describe("until.sameAs", () => {
    it("should be empty when paths has no common parent", () => {
      const first = flexi.path("/unknown/path");
      const second = flexi.path("another");

      expect(
        walker.back(first, { until: walker.until.sameAs(second) }).result
      ).toBe(flexi.empty());
    });

    it("should be root", () => {
      expect(
        walker.back("/first", { until: walker.until.sameAs("/second") }).result
      ).toBe(flexi.root());
    });

    it("should return closest parent", () => {
      const first = flexi.path("/closest/parent/first/path");
      const second = flexi.path("/closest/parent/second/path");
      const expected = flexi.path("/closest/parent/");

      expect(
        walker.back(first, { until: walker.until.sameAs(second) }).result
      ).toHaveMatchingMembersOf(expected);
    });
  });
});
