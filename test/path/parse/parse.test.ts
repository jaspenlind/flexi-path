import { normalize } from "path";

import flexi from "../../../src";
import { meta, parse } from "../../../src/lib/path";

describe("path", () => {
  describe("parse", () => {
    const basePath = "base";
    const path = "path";
    const emptyPath = "";
    const basePathWithPath = `${basePath}/${path}`;

    it("should be empty when path is empty", () => {
      expect(parse(emptyPath)).toHaveMatchingMembersOf(flexi.empty());
    });

    it("can parse string path", () => {
      expect(parse(path).path).toBe(path);
    });

    it("can parse FlexiPath", () => {
      const flexiPath = flexi.path(path);

      expect(parse(flexiPath)).toBe(flexiPath);
    });

    it("can parse when basePath=string and path=string", () => {
      expect(parse({ basePath, path }).path).toBe(normalize(basePathWithPath));
    });

    it("can parse when basePath=string and path=FlexiPath", () => {
      const expected = flexi.path(basePathWithPath);

      const result = parse({ basePath, path: flexi.path(path) });

      expect(result).toHaveMatchingMembersOf(expected);
    });

    it("can parse when basePath=FlexiPath and path=string", () => {
      expect(parse({ basePath: flexi.path(basePath), path }).path).toBe(
        normalize(basePathWithPath)
      );
    });

    it("can parse when basePath=FlexiPath and path=FlexiPath", () => {
      expect(
        parse({ basePath: flexi.path(basePath), path: flexi.path(path) }).path
      ).toBe(normalize(basePathWithPath));
    });

    it("can parse when path is array of strings", () => {
      const array = ["array", "path"];

      expect(parse(array).path).toBe(normalize("array/path"));
    });

    it("can parse when basePath=string and path=array", () => {
      const first = "a/base/path";
      const second = ["second", "path"];

      expect(parse({ basePath: first, path: second }).path).toBe(
        normalize("a/base/path/second/path")
      );
    });

    it("can parse when basePath=array and path=array", () => {
      const first = ["a", "base", "path"];
      const second = ["second", "path"];

      expect(parse({ basePath: first, path: second }).path).toBe(
        normalize("a/base/path/second/path")
      );
    });

    it("can parse when basePath=array and path=string", () => {
      const first = ["a", "base", "path"];
      const second = "second/path";

      expect(parse({ basePath: first, path: second }).path).toBe(
        normalize("a/base/path/second/path")
      );
    });

    it("can parse when basePath=FlexiPath and path=array", () => {
      const first = flexi.path("a/base/path");
      const second = ["second", "path"];

      expect(parse({ basePath: first, path: second }).path).toBe(
        normalize("a/base/path/second/path")
      );
    });

    it("can parse whan basePath=array and path=FlexiPath", () => {
      const first = ["a", "base", "path"];
      const second = flexi.path("second/path");

      expect(parse({ basePath: first, path: second }).path).toBe(
        normalize("a/base/path/second/path")
      );
    });

    it("can parse PathMeta", () => {
      const pathMeta = meta("path");

      expect(parse(pathMeta).path).toBe("path");
    });
  });
});
