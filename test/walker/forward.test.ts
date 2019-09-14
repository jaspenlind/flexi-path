import { flexi } from "../../src/lib";
import { testDir } from "../jest/createTestData";

describe("walker", () => {
  describe("forward", () => {
    it("should be empty when path is empty", () => {
      expect(flexi.walk.forward(flexi.empty()).result).toBeEmpty();
    });

    it("should be empty when path does not exist", () => {
      const path = flexi.path("nonexisting");

      expect(flexi.walk.forward(path).result).toBeEmpty();
    });

    it("should be empty when path has no content", () => {
      const path = flexi
        .path(testDir)
        .append("walk_empty_when_no_content/")
        .write();

      expect(flexi.walk.forward(path).result).toBeEmpty();
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

      const result = flexi.walk.forward(path).result.map(x => x.path);

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

      const walked = flexi.walk.forward(path, {
        until: x => x.name.startsWith("sub")
      });

      expect(walked.result).toHaveLength(3);

      expect(walked.result.find(x => x.name === sub1.name)).not.toBeUndefined();
      expect(walked.result.find(x => x.name === sub2.name)).not.toBeUndefined();
      expect(
        walked.result.find(x => x.name === subFile.name)
      ).not.toBeUndefined();
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

      const walked = flexi.walk.forward(path, {
        until: x => x.base === file.base
      });

      expect(walked.result).toHaveLength(1);
      expect(walked.result[0]).toHaveMatchingMembersOf(file);
    });

    it("should be empty when condition is not met", () => {
      const path = flexi
        .path({ basePath: testDir, path: "walk_empty_when_condition_not_met/" })
        .write();

      path.append("sub1/sub2/sub3/sub4/sub5/").write();

      expect(
        flexi.walk.forward(path, { until: x => x.name === "sub77" }).result
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
        flexi.walk.forward(path, { until: x => x.name === deepest.name }).result
      ).toHaveLength(1);
    });

    it("should walk whole path", () => {
      const path = flexi
        .path({ basePath: testDir, path: "walk_should_walk_whole_path/" })
        .write();

      const wholePath = path.append("whole/path").write();

      const walked = flexi.walk.forward(path);

      expect(walked.result).toHaveLength(1);

      expect(walked.result[0]).toHaveMatchingMembersOf(wholePath);
    });

    it("can report walking", () => {
      const report = jest.fn();
      const path = flexi
        .path({ basePath: testDir, path: "walk_can_report_walking/" })
        .write();

      path.append("two/levels/").write();

      flexi.walk.forward(path, { onWalk: () => report() });

      expect(report).toHaveBeenCalledTimes(3);
    });
  });
});
