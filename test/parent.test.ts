import parent from "../src/parent";
import flexi, { FlexiPath } from "../src";

describe("parent", () => {
  const path = "/directory/containing/a/file.js";
  let flex: FlexiPath;

  beforeEach(() => {
    flex = flexi.path(path);
  });

  it("should be parent", () => {
    const expected = flexi.path("/directory/containing/a/");

    const received = parent(flex.path)(); // flex.parent();

    expect(received).toHaveMatchingMembersOf(expected);
  });

  it("should be parent of parent", () => {
    const expected = flexi.path("/directory/containing/");

    const flexParent = parent(flex.path)();
    const grandParent =
      (flexParent !== null && parent(flexParent.path)()) || null;

    // const received = parent(parent(flex.path)() || flexi.root())(); // (flex.parent() || flexi.root()).parent();

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

    it("should be null when levels is greater than path", () => {
      expect(parent(flexi.root().path)(5000)).toBeNull();
      // expect(flexi.root().parent(5000)).toBeNull();
    });
  });

  const goToRoot = (current: FlexiPath): FlexiPath | null => {
    const parentOfCurrent = parent(current.path)();

    if (parentOfCurrent === null) {
      return null;
    }

    if (parentOfCurrent.isRoot()) {
      return parentOfCurrent;
    }

    return goToRoot(parentOfCurrent);
  };

  it("can navigate to root", () => {
    const root = flexi.root();

    const result = goToRoot(flex);

    expect(result).toHaveMatchingMembersOf(root);
  });

  it("should have null parent of root", () => {
    const root = flexi.root();

    expect(parent(root.path)()).toBeNull();
  });
});
