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
      const [first, second, third, fourth, fifth] = result;

      const deepestAppendedPath = 5;
      expect(result).toHaveLength(deepestAppendedPath);

      expect(first).toBe(file4.path);
      expect(second).toBe(file1.path);
      expect(third).toBe(file2.path);
      expect(fourth).toBe(file3.path);
      expect(`${fifth}/`).toBe(sub2.path);
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
      const depthOfSub = 3;
      expect(walked.result).toHaveLength(depthOfSub);

      expect(walked.result.find(x => x.name === sub1.name)).not.toBeUndefined();
      expect(walked.result.find(x => x.name === sub2.name)).not.toBeUndefined();
      expect(walked.result.find(x => x.name === subFile.name)).not.toBeUndefined();
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

      const depthOfCommonPath = 1;

      const walked = flexi.walk.forward(path, {
        until: x => x.base === file.base
      });

      expect(walked.result).toHaveLength(depthOfCommonPath);

      const [firstWalkedResult] = walked.result;

      expect(firstWalkedResult).toHaveMatchingMembersOf(file);
    });

    it("should be empty when condition is not met", () => {
      const path = flexi.path({ basePath: testDir, path: "walk_empty_when_condition_not_met/" }).write();

      path.append("sub1/sub2/sub3/sub4/sub5/").write();

      expect(flexi.walk.forward(path, { until: x => x.name === "sub77" }).result).toBeEmpty();
    });

    it("can walk deep paths", () => {
      const path = flexi.path({ basePath: testDir, path: "walk_can_walk_deep_paths/" }).write();

      let sub1 = flexi.path("sub1/");
      let sub2 = flexi.path("sub2/");

      const manySubFolders = 20;
      const stepCount = 1;

      for (let i = 0; i < manySubFolders; i += stepCount) {
        sub1 = sub1.append("sub1/");
        sub2 = sub2.append("sub2/");
      }

      path.append(sub1).write();
      const written = path.append(sub2).write();

      const deepest = written.append("deep/").write();
      const depthOfDeepest = 1;

      expect(flexi.walk.forward(path, { until: x => x.name === deepest.name }).result).toHaveLength(depthOfDeepest);
    });

    it("should walk whole path", () => {
      const path = flexi.path({ basePath: testDir, path: "walk_should_walk_whole_path/" }).write();

      const wholePath = path.append("whole/path").write();

      const walked = flexi.walk.forward(path);
      const fullyWalkedDepth = 1;
      expect(walked.result).toHaveLength(fullyWalkedDepth);

      const [firstWalkedResult] = walked.result;

      expect(firstWalkedResult).toHaveMatchingMembersOf(wholePath);
    });

    it("can report walking", () => {
      const report = jest.fn();
      const path = flexi.path({ basePath: testDir, path: "walk_can_report_walking/" }).write();

      path.append("two/levels/").write();

      const pathLevelCount = 3;

      flexi.walk.forward(path, { onWalk: () => report() });

      expect(report).toHaveBeenCalledTimes(pathLevelCount);
    });
  });
});
