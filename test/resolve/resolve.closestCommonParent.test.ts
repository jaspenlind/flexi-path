import flexi from "../../src";
import { closestCommonParent } from "../../src/resolve/strategies";

describe("resolve", () => {
  describe("closestCommonParent", () => {
    it("should return null when paths has no common parent", () => {
      const first = flexi.path("/unknown/path");
      const second = flexi.path("/another");

      expect(flexi.resolve(first, closestCommonParent(second))).toBeNull();
    });

    it("should return closest parent", () => {
      const first = flexi.path("/closest/parent/first/path");
      const second = flexi.path("/closest/parent/second/path");
      const expected = flexi.path("/closest/parent/");

      expect(
        flexi.resolve(first, closestCommonParent(second))
      ).toHaveMatchingMembersOf(expected);
    });
  });
});
