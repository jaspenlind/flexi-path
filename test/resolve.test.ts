import { ParsedPath } from "path";
import flexi, { NavigationState } from "../src";

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
});
