import { join } from "path";
import { FlexiPath, PathWithBasePath, Path } from "..";
import path from "./path";
/**
 * Used for parsing a `Path` into a `FlexiPath`
 * @category path
 * @param path The `Path` to parse
 * @returns Then parsed `path`
 */
const parse = (current: Path): FlexiPath => {
  let parsed: FlexiPath | undefined;
  if (Array.isArray(current)) {
    return path(join(...current));
  }

  if (typeof current === "object") {
    const pathWithBasePath = current as PathWithBasePath;
    if (typeof pathWithBasePath.basePath !== "undefined") {
      const basePath = parse(pathWithBasePath.basePath);
      const currentPath = parse(pathWithBasePath.path);
      parsed = path(join(basePath.path, currentPath.path));
    } else {
      parsed = current as FlexiPath;
    }
  }

  return parsed || path(current as string);
};

export default parse;
