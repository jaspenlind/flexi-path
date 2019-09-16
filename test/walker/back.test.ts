import { flexi } from "../../src/lib";
import { FlexiPath, PathMeta, WalkedState } from "../../src/types";
import { testDir } from "../jest/createTestData";

describe("walk", () => {
  describe("back", () => {
    it("should be empty when path is empty", () => {
      expect(flexi.walk.back(flexi.empty()).result).toBe(flexi.empty());
    });

    it("can stop when parent is empty", () => {
      const path = flexi.path("path");

      expect(flexi.walk.back(path).result).toBe(flexi.empty());
    });

    it("can stop when condition is met", () => {
      const sub = flexi.path("root").append("sub/");

      const path = sub.append("path").append("other");

      expect(
        flexi.walk.back(path, { until: x => x.name === "sub" }).result
      ).toHaveMatchingMembersOf(sub);
    });

    it("is empty when condition is not met", () => {
      expect(
        flexi.walk.back(flexi.path("some/path"), {
          until: x => x.name === "invalid"
        }).result
      ).toBe(flexi.empty());
    });

    it("can report walking", () => {
      const report = jest.fn();
      const path = flexi.path("first/second/third");

      flexi.walk.back(path, { onWalk: () => report() });

      expect(report).toHaveBeenCalledTimes(3);
    });

    it("can return directory with predicate", () => {
      const fullPath = flexi
        .path(testDir)
        .append("resolve-subFolder-predicate")
        .append("subOfSubFolder/resolve.t")
        .write();

      const result = flexi.walk.back(fullPath, {
        until: x => x.name === "resolve-subFolder-predicate"
      });

      expect(result.result.name).toBe("resolve-subFolder-predicate");
    });

    it("can walk from path", () => {
      expect(
        flexi
          .path("/one/two/three")
          .walk()
          .back()
      ).toBe(flexi.root());

      const forwardWalkPath = flexi
        .path(testDir)
        .append("back_can_walk_path/sub/")
        .write();

      expect(
        forwardWalkPath
          .parent()
          .parent()
          .parent()
          .walk()
          .forward().length
      ).toBeGreaterThan(2);
    });

    it("can resolve with navigate skip override", () => {
      test.todo("todo");
      //     const path = flexi.path("/fictional/path/with/file.js");
      //     const expected = flexi.path("/fictional/");

      //     const predicate = (x: ParsedPath) => x.name === "path";
      //     const onNavigate = (x: ParsedPath) => ({
      //       state:
      //         x.name === "fictional" ? NavigationState.Found : NavigationState.Skip
      //     });

      //     const result = flexi.resolve(path, { onNavigate, predicate });

      //     expect(result).toHaveMatchingMembersOf(expected);
    });

    it("can abort", () => {
      test.todo("todo");
      //     const path = flexi.path("/fictional/path/with/file.js");

      //     const result = flexi.resolve(path, {
      //       onNavigate: () => ({
      //         state: NavigationState.Abort
      //       }),
      //       predicate: () => false
      //     });

      //     expect(result).toBe(flexi.empty());
    });
  });
});
