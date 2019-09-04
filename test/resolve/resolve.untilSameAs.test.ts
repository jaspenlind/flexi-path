import flexi from "../../src";
import { untilSameAs } from "../../src/lib/path/resolve/strategies";

describe("resolve", () => {
  describe("closestCommonParent", () => {
    it("should be empty when paths has no common parent", () => {
      const first = flexi.path("/unknown/path");
      const second = flexi.path("/another");

      expect(flexi.resolve(first, untilSameAs(second))).toBe(flexi.empty());
    });

    it("should return closest parent", () => {
      const first = flexi.path("/closest/parent/first/path");
      const second = flexi.path("/closest/parent/second/path");
      const expected = flexi.path("/closest/parent/");

      expect(flexi.resolve(first, untilSameAs(second))).toHaveMatchingMembersOf(
        expected
      );
    });
  });
});
