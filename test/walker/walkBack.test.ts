import flexi, { PathMeta } from "../../src";
import walker from "../../src/lib/walker";

describe("walk", () => {
  describe("walkBack", () => {
    it("should be empty when path is empty", () => {
      expect(walker.walkBack(flexi.empty()).result).toBe(flexi.empty());
    });

    it("can stop when parent is empty", () => {
      const path = flexi.path("path");

      expect(walker.walkBack(path).result).toBe(flexi.empty());
    });

    it("can stop when condition is met", () => {
      const sub = flexi.path("root").append("sub/");

      const path = sub.append("path").append("other");

      expect(
        walker.walkBack(path, { until: (x: PathMeta) => x.name === "sub" })
          .result
      ).toHaveMatchingMembersOf(sub);
    });

    it("is empty when condition is not met", () => {
      expect(
        walker.walkBack(flexi.path("some/path"), {
          until: (x: PathMeta) => x.name === "invalid"
        }).result
      ).toBe(flexi.empty());
    });

    it("can report walking", () => {
      const report = jest.fn();
      const path = flexi.path("first/second/third");

      walker.walkBack(path, { onWalk: () => report() });

      expect(report).toHaveBeenCalledTimes(3);
    });
  });
});
