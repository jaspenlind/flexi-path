import flexi from "../../src";

describe("path", () => {
  describe("intersect", () => {
    it("should return intersected paths", () => {
      const one = flexi.path("one");
      const two = flexi.path("two");
      const three = flexi.path("three");

      const first = flexi.path("first").append(one).append("rubbish").append(two).append(three);

      const second = flexi.path("second").append(two).append("other").append(three);

      const third = flexi.path("third").append(two).append("invalid").append(three);

      const expected = two.append(three);

      const result = first.intersect(second, third);

      expect(result).toHaveMatchingMembersOf(expected);
    });

    it("should be empty when paths are empty", () => {
      expect(flexi.empty().intersect(flexi.empty())).toBe(flexi.empty());
    });
  });
});
