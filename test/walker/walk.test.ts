import flexi, { PathMeta } from "../../src";
import walker from "../../src/lib/walker";
import { testDir } from "../jest/createTestData";

describe("walker", () => {
  describe("walk", () => {
    it("should be empty when path is empty", () => {
      expect(walker.walk(flexi.empty())).toBeEmpty();
    });

    it("should be empty when path does not exist", () => {
      const path = flexi.path("nonexisting");

      expect(walker.walk(path)).toBeEmpty();
    });

    it("should be empty when path has no content", () => {
      const path = flexi
        .path(testDir)
        .append("walk_empty_when_no_content/")
        .write();

      expect(walker.walk(path)).toBeEmpty();
    });

    it("should return all content when no condition", () => {
      const path = flexi
        .path(testDir)
        .append("walk_all_content_no_condition/")
        .write();

      const sub1 = path.append("sub1/").write();

      const file1 = sub1.append("file1.js").write();
      const file2 = sub1.append("file2.txt").write();
      const file3 = sub1
        .append("sub1_1")
        .append("sub1_2")
        .append("file3.json")
        .write();

      const sub2 = path.append("sub2/").write();
      const file4 = path.append("file4.php").write();

      const result = walker.walk(path).map(x => x.path);

      expect(result).toHaveLength(5);

      expect(result[0]).toBe(file4.path);
      expect(result[1]).toBe(file1.path);
      expect(result[2]).toBe(file2.path);
      expect(result[3]).toBe(file3.path);
      expect(`${result[4]}/`).toBe(sub2.path);
    });

    it("should return content matching condition", () => {
      const path = flexi
        .path(testDir)
        .append("walk_content_matching_condition/")
        .write();

      const sub1 = path.append("sub1/").write();
      const sub2 = path.append("sub2/").write();

      path.append("another/").write();

      const subFile = path.append("subfile.js").write();

      const result = walker.walk(path, {
        until: (x: PathMeta) => x.name.startsWith("sub")
      });

      expect(result).toHaveLength(3);

      expect(result.find(x => x.name === sub1.name)).not.toBeUndefined();
      expect(result.find(x => x.name === sub2.name)).not.toBeUndefined();
      expect(result.find(x => x.name === subFile.name)).not.toBeUndefined();
    });

    it("should walk until condition is met", () => {
      const path = flexi
        .path(testDir)
        .append("walk_until_condition_is_met/")
        .write();

      path
        .append("sub1")
        .append("sub2")
        .append("sub3/")
        .write();

      const file = path
        .append("sub1")
        .append("sub2")
        .append("test.ts")
        .write();

      const result = walker.walk(path, {
        until: (x: PathMeta) => x.base === file.base
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveMatchingMembersOf(file);
    });

    it("should be empty when condition is not met", () => {
      const path = flexi
        .path({ basePath: testDir, path: "walk_empty_when_condition_not_met/" })
        .write();

      path.append("sub1/sub2/sub3/sub4/sub5/").write();

      expect(
        walker.walk(path, { until: (x: PathMeta) => x.name === "sub77" })
      ).toBeEmpty();
    });

    it("can walk deep paths", () => {
      const path = flexi
        .path({ basePath: testDir, path: "walk_can_walk_deep_paths/" })
        .write();

      let sub1 = flexi.path("sub1/");
      let sub2 = flexi.path("sub2/");
      for (let i = 0; i < 20; i += 1) {
        sub1 = sub1.append("sub1/");
        sub2 = sub2.append("sub2/");
      }

      path.append(sub1).write();
      const written = path.append(sub2).write();

      const deepest = written.append("deep/").write();

      expect(
        walker.walk(path, { until: (x: PathMeta) => x.name === deepest.name })
      ).toHaveLength(1);
    });

    it("should walk whole path", () => {
      const path = flexi
        .path({ basePath: testDir, path: "walk_should_walk_whole_path/" })
        .write();

      const wholePath = path.append("whole/path").write();

      const result = walker.walk(path);

      expect(result).toHaveLength(1);

      expect(result[0]).toHaveMatchingMembersOf(wholePath);
    });

    it("can report walking", () => {
      const report = jest.fn();
      const path = flexi
        .path({ basePath: testDir, path: "walk_can_report_walking/" })
        .write();

      path.append("two/levels/").write();

      walker.walk(path, { onWalk: () => report() });

      expect(report).toHaveBeenCalledTimes(3);
    });
  });
});
