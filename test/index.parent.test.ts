import flexiPath from "../src";

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
});
