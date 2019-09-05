import flexi from "../src";

describe("path", () => {
  describe("cut", () => {
    it("can cut path", () => {
      const path = flexi
        .path("one")
        .append("two")
        .append("three/four/five/six");
      const expected = flexi.path("one/two/three/");

      expect(path.cut(3).path).toBe(expected.path);
    });
    it("can cut empty path", () => {
      expect(flexi.empty().cut(1)).toHaveMatchingMembersOf(flexi.empty());
    });
    it("can cut short path", () => {
      const path = flexi.path("path");

      expect(path.cut(100)).toHaveMatchingMembersOf(path);
    });
  });
});
