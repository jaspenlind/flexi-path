import flexiPath, { Root } from "../src";
import { FlexiPath } from "../src/types";

describe("parent", () => {
  const path = "/directory/containing/a/file.js";
  let flex: FlexiPath;

  beforeEach(() => {
    flex = flexiPath(path);
  });

  it("should be parent", () => {
    const expected = flexiPath("/directory/containing/a/");

    const received = flex.parent();

    expect(received).toHaveMatchingMembersOf(expected);
  });

  it("should be parent of parent", () => {
    const expected = flexiPath("/directory/containing/");

    const received = (flex.parent() || Root()).parent();

    expect(received).toHaveMatchingMembersOf(expected);
  });

  describe("when passing levels", () => {
    it("should return parent number of levels up", () => {
      const longPath = flexiPath(
        "/deep/directory/structure/with/multiple/sub/folders"
      );

      const expected = flexiPath("/deep/directory/");

      const received = longPath.parent(5);

      expect(received).toHaveMatchingMembersOf(expected);
    });

    it("should be null when levels is greater than path", () => {
      expect(Root().parent(5000)).toBeNull();
    });
  });

  const goToRoot = (current: FlexiPath): FlexiPath | null => {
    const parent = current.parent();

    if (parent === null) {
      return null;
    }

    if (parent.isRoot()) {
      return parent;
    }

    return goToRoot(parent);
  };

  it("can navigate to root", () => {
    const root = Root();

    const result = goToRoot(flex);

    expect(result).toHaveMatchingMembersOf(root);
  });

  it("should have null parent of root", () => {
    const root = Root();

    expect(root.parent()).toBeNull();
  });
});
