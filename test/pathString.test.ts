import { normalize } from "path";

import { empty as emptyMeta } from "../src/lib/meta";
import { empty as emptyPath } from "../src/lib/path";
import pathString from "../src/lib/pathString";
import { PathMeta } from "../src/types";

describe("pathString", () => {
  it("can return path from string", () => {
    expect(pathString("path")).toBe("path");
  });

  it("can return path from array", () => {
    expect(pathString(["array", "path"])).toBe(normalize("array/path"));
  });

  it("can return path from path with basePath", () => {
    expect(pathString({ basePath: "base", path: "path" })).toBe(
      normalize("base/path")
    );
  });

  it("can return path from path meta", () => {
    const meta: PathMeta = { ...emptyMeta(), ...{ path: "metaPath" } };

    expect(pathString(meta)).toBe("metaPath");
  });

  it("can return path from flexipath", () => {
    const path = { ...emptyPath(), ...{ path: "flexiPath" } };

    expect(pathString(path)).toBe("flexiPath");
  });
});
