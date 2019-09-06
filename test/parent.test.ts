import { normalize } from "path";

import flexi, { FlexiPath } from "../src";
import parent from "../src/lib/parent";

describe("parent", () => {
  const path = "/directory/containing/a/file.js";
  let flex: FlexiPath;

  beforeEach(() => {
    flex = flexi.path(path);
  });

  it("should be empty when path is invalid", () => {
    const invalid = flexi.path("invalid");

    expect(invalid.parent()).toBe(flexi.empty());
  });

  it("should be parent", () => {
    const expected = flexi.path("/directory/containing/a/");

    const received = parent(flex.path)();

    expect(received).toHaveMatchingMembersOf(expected);
  });

  it("should be parent of parent", () => {
    const expected = flexi.path("/directory/containing/");

    const flexParent = parent(flex.path)();
    const grandParent =
      (flexParent !== null && parent(flexParent.path)()) || null;

    expect(grandParent).toHaveMatchingMembersOf(expected);
  });

  describe("when passing levels", () => {
    it("should return parent number of levels up", () => {
      const longPath = flexi.path(
        "/deep/directory/structure/with/multiple/sub/folders/"
      );

      const expected = flexi.path("/deep/directory/");

      const received = parent(longPath)(5);

      expect(received).toHaveMatchingMembersOf(expected);
    });

    it("should be empty when levels is greater than path", () => {
      expect(parent(flexi.root().path)(5000)).toBe(flexi.empty());
    });
  });

  const goToRoot = (current: FlexiPath): FlexiPath | null => {
    return current.isRoot() ? current : goToRoot(current.parent());
  };

  it("can navigate to root", () => {
    const root = flexi.root();

    const result = goToRoot(flex);

    expect(result).toHaveMatchingMembersOf(root);
  });

  it("should be empty when parent is root", () => {
    const root = flexi.root();

    expect(root.parent()).toBe(flexi.empty());
  });

  it("should return parent when condition is met", () => {
    expect(flex.parent(x => x.name === "directory").path).toBe(
      normalize("/directory/")
    );
  });
});
