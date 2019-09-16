import { normalize } from "path";

import flexi from "../../src";
import { FlexiPath, PathType } from "../../src/types";

describe("path", () => {
  describe("default state", () => {
    const path = "/directory/containing/a/file.js";
    const pathDepth = 4;
    let flex: FlexiPath;

    beforeEach(() => {
      flex = flexi.path(path);
    });

    it("should have path", () => {
      expect(flex.path).toBe(normalize(path));
    });

    it("should have root", () => {
      expect(flex.root).toBe(normalize("/"));
    });

    it("should have dir", () => {
      expect(flex.dir).toBe(normalize("/directory/containing/a"));
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

    it("should be valid", () => {
      expect(flex.isValid()).toBeTrue();
    });

    it("should be unknown when not valid", () => {
      expect(flexi.path("invalid").type()).toBe(PathType.Unknown);
    });

    it("should not have sub directories", () => {
      expect(flex.subDirectories()).toBeEmpty();
    });

    it("should not have files", () => {
      expect(flex.files()).toBeEmpty();
    });

    it("should have depth", () => {
      expect(flex.depth).toBe(pathDepth);
    });
  });
});
