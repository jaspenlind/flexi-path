import { normalize } from "path";

import flexi from "../../../src/lib/flexi";
import { empty as emptyPath } from "../../../src/lib/path";
import { empty as emptyMeta } from "../../../src/lib/path/meta";
import pathString from "../../../src/lib/path/parse/pathString";

describe("path", () => {
  describe("parse", () => {
    describe("pathString", () => {
      it("can return path from string", () => {
        expect(pathString("path")).toBe("path");
      });

      it("can return path from array", () => {
        expect(pathString(["array", "path"])).toBe(normalize("array/path"));
      });

      it("can return path from path with basePath", () => {
        expect(pathString({ basePath: "base", path: "path" })).toBe(normalize("base/path"));
      });

      it("can return path from path meta", () => {
        const meta = { ...emptyMeta(), ...{ path: "metaPath" } };

        expect(pathString(meta)).toBe("metaPath");
      });

      it("can return path from flexipath", () => {
        const path = { ...emptyPath(), ...{ path: "flexiPath" } };

        expect(pathString(path)).toBe("flexiPath");
      });

      it("can get pathString via flexi", () => {
        const path = "path";

        expect(flexi.pathString(flexi.path(path))).toBe(path);
        expect(flexi.pathString({ ...emptyMeta(), ...{ path } })).toBe(path);
        expect(flexi.pathString({ basePath: path, path })).toBe(normalize("path/path"));
        expect(flexi.pathString([path])).toBe(path);
        expect(flexi.pathString(path)).toBe(path);
      });
    });
  });
});
