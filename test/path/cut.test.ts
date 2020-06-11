import flexi from "../../src";

describe("path", () => {
  describe("cut", () => {
    it("can cut path", () => {
      const threeLevels = 3;
      const path = flexi.path("one").append("two").append("three/four/five/six");
      const expected = flexi.path("one/two/three/");

      expect(path.cut(threeLevels).path).toBe(expected.path);
    });
    it("can cut empty path", () => {
      const oneLevel = 1;
      expect(flexi.empty().cut(oneLevel)).toHaveMatchingMembersOf(flexi.empty());
    });
    it("can cut short path", () => {
      const lotsOfLevels = 100;
      const path = flexi.path("path");

      expect(path.cut(lotsOfLevels)).toBe(flexi.empty());
    });
  });
});
