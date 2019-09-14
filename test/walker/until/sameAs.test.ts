import flexi, { until } from "../../../src";

describe("walker", () => {
  describe("until.sameAs", () => {
    it("should be empty when paths has no common parent", () => {
      const first = flexi.path("/unknown/path");
      const second = flexi.path("another");

      expect(
        flexi.walk.back(first, { until: until.sameAs(second) }).result
      ).toBe(flexi.empty());
    });

    it("should be root", () => {
      expect(
        flexi.walk.back("/first", { until: until.sameAs("/second") }).result
      ).toBe(flexi.root());
    });

    it("should return closest parent", () => {
      const first = flexi.path("/closest/parent/first/path");
      const second = flexi.path("/closest/parent/second/path");
      const expected = flexi.path("/closest/parent/");

      expect(
        flexi.walk.back(first, { until: until.sameAs(second) }).result
      ).toHaveMatchingMembersOf(expected);
    });
  });
});
