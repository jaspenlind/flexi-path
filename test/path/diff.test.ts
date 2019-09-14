import flexi from "../../src";

describe("path", () => {
  describe("diff", () => {
    it("should be empty when paths are equal", () => {
      const first = flexi.path("path");
      const second = flexi.path("path");

      const empty = flexi.empty();

      const [firstResult, secondResult] = first.diff(second);
      expect(firstResult).toHaveMatchingMembersOf(empty);
      expect(secondResult).toHaveMatchingMembersOf(empty);
    });

    it("should return diff of the paths", () => {
      const common = flexi.path("/common/root");
      const first = flexi.path("first/path");
      const second = flexi.path("second/path");

      const [result1, result2] = common
        .append(first)
        .diff(common.append(second));

      expect(result1).toHaveMatchingMembersOf(first);
      expect(result2).toHaveMatchingMembersOf(second);
    });
  });
});
