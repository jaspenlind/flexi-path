import FlexiPath, { PathType } from "../src";

describe("initial state", () => {
  const path = "/directory/containing/a/file.js";
  let flex: FlexiPath;

  beforeEach(() => {
    flex = FlexiPath(path);
  });

  it("should have path", () => {
    expect(flex.path).toBe(path);
  });

  it("should have root", () => {
    expect(flex.root).toBe("/");
  });

  it("should have dir", () => {
    expect(flex.dir).toBe("/directory/containing/a");
  });

  it("should have base", () => {
    expect(flex.base).toBe("file.js");
  });

  it("should have name", () => {
    expect(flex.name).toBe("file");
  });

  it("should have ext", () => {
    expect(flex.ext).toBe(".js");
  });

  it("should have parent", () => {
    expect(flex.parent()).not.toBeNull();
  });

  it("should not be root", () => {
    expect(flex.isRoot()).toBe(false);
  });

  it("should not exist", () => {
    expect(flex.exists()).toBe(false);
  });

  it("should be unknown", () => {
    expect(flex.type()).toBe(PathType.Unknown);
  });

  it("should not have sub directories", () => {
    expect(flex.subDirectories()).toHaveLength(0);
  });

  it("should not have files", () => {
    expect(flex.files()).toHaveLength(0);
  });
});
