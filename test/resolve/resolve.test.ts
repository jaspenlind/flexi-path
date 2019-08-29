import { ParsedPath, join } from "path";
import flexi, { NavigationState, ResolveOptions } from "../../src";
import testData from "../jest/createTestData";

describe("resolve", () => {
  it("can resolve with predicate", () => {
    const path = flexi.path("/fictional/path/with/file.js");
    const expected = flexi.path("/fictional/path/");

    const result = flexi.resolve(path, { predicate: x => x.name === "path" });

    expect(result).toHaveMatchingMembersOf(expected);
  });

  it("should be null when predicate does not match", () => {
    const path = flexi.path("dummy");

    const result = flexi.resolve(path, {
      predicate: x => x.root === "invalid"
    });

    expect(result).toBeNull();
  });

  it("can resolve with navigate skip override", () => {
    const path = flexi.path("/fictional/path/with/file.js");
    const expected = flexi.path("/fictional/");

    const predicate = (x: ParsedPath) => x.name === "path";
    const onNavigate = (x: ParsedPath) =>
      x.name === "fictional" ? NavigationState.Found : NavigationState.Skip;
    const result = flexi.resolve(path, { predicate, onNavigate });

    expect(result).toHaveMatchingMembersOf(expected);
  });

  it("can abort", () => {
    const path = flexi.path("/fictional/path/with/file.js");

    const result = flexi.resolve(path, {
      predicate: () => true,
      onNavigate: () => NavigationState.Abort
    });

    expect(result).toBeNull();
  });

  it("can return directory with predicate", () => {
    const subFolderName = "resolve-subFolder-predicate";
    const subOfSubName = join(subFolderName, "subOfSubFolder");
    testData.createDirectory(subFolderName);
    testData.createFile("resolve.t", subFolderName);
    testData.createDirectory(subOfSubName);

    const path = flexi.path(join(testData.testDir, subOfSubName));
    const expected = flexi.path(join(testData.testDir, subFolderName, "/"));

    const options: ResolveOptions = {
      predicate: current => {
        return (
          current.name === subFolderName &&
          current.files().find(x => x.base === "resolve.t") !== undefined
        );
      }
    };

    expect(flexi.resolve(path, options)).toHaveMatchingMembersOf(expected);
  });
});
