import flexi, { parse, empty } from "../src";

describe("path", () => {
  describe("parse", () => {
    const basePath = "base";
    const path = "path";
    const emptyPath = "";
    const basePathWithPath = `${basePath}/${path}`;

    it("should be empty when path is empty", () => {
      expect(parse(emptyPath)).toHaveMatchingMembersOf(empty());
    });

    it("can parse string path", () => {
      expect(parse(path).path).toBe(path);
    });

    it("can parse FlexiPath", () => {
      const flexiPath = flexi.path(path);

      expect(parse(flexiPath)).toBe(flexiPath);
    });

    it("can parse when basePath=string and path=string", () => {
      expect(parse({ basePath, path }).path).toBe(basePathWithPath);
    });

    it("can parse when basePath=string and path=FlexiPath", () => {
      const expected = flexi.path(basePathWithPath);

      const result = parse({ basePath, path: flexi.path(path) });

      expect(result).toHaveMatchingMembersOf(expected);
    });

    it("can parse when basePath=FlexiPath and path=string", () => {
      expect(parse({ basePath: flexi.path(basePath), path }).path).toBe(
        basePathWithPath
      );
    });

    it("can parse when basePath=FlexiPath and path=FlexiPath", () => {
      expect(
        parse({ basePath: flexi.path(basePath), path: flexi.path(path) }).path
      ).toBe(basePathWithPath);
    });
  });
});
