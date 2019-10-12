import flexi from "../../../src";
import meta from "../../../src/lib/path/meta";
import pathKind, { PathKind } from "../../../src/lib/path/parse/pathKind";

describe("path", () => {
  describe("parse", () => {
    describe("pathKind", () => {
      it("should be string kind", () => {
        expect(pathKind("string")).toBe(PathKind.String);
      });

      it("should be array kind", () => {
        expect(pathKind(["array"])).toBe(PathKind.Array);
      });

      it("should be path with base path kind", () => {
        expect(pathKind({ basePath: "base", path: "path" })).toBe(PathKind.PathWithBasePath);
      });

      it("should be path meta kind", () => {
        expect(pathKind(meta("meta"))).toBe(PathKind.PathMeta);
      });

      it("should be flexipath kind", () => {
        expect(pathKind(flexi.path("flexi"))).toBe(PathKind.FlexiPath);
      });
    });
  });
});
