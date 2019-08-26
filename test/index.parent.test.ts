import flexiPath, { Root, FlexiPath } from "../src";

describe("parent", () => {
  const path = "/directory/containing/a/file.js";
  let flex: flexiPath;

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
