import flexi from "../../src";

describe("path", () => {
  describe("reverse", () => {
    it("should still be empty", () => {
      expect(flexi.empty().reverse().isEmpty()).toBeTrue();
    });

    it("can reverse path", () => {
      const path = flexi.path("one").append("two").append("three");

      const expected = flexi.path("three").append("two").append("one");

      expect(path.reverse()).toHaveMatchingMembersOf(expected);
    });
  });
});
