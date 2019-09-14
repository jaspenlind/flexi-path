import flexi from "../../src";

describe("path", () => {
  describe("except", () => {
    it("should exclude paths", () => {
      const path = flexi.path("some/arbitratry/path").append("and/some/more");
      const pathsToExclude = [flexi.path("arbitratry"), "some"];
      const expected = flexi.path("path/and/more");

      expect(path.except(...pathsToExclude)).toHaveMatchingMembersOf(expected);
    });

    it("should be empty for empty path", () => {
      const empty = flexi.empty();

      expect(empty.except(flexi.path("path"))).toBe(flexi.empty());
    });
  });
});
