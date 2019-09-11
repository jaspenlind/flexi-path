import { join } from "path";

import flexi, {
  FlexiPath,
  Path,
  PathKind,
  PathVistor,
  PathWithBasePath
} from "..";
import path from "./path";
import pathKind from "./pathKind";

/**
 * @ignore
 */
const pathVisitor = ((): PathVistor<FlexiPath> => {
  const visitString = (current: Path, kind: PathKind) =>
    kind === PathKind.String ? path(current) : flexi.empty();

  const visitArray = (current: Path, kind: PathKind) =>
    kind === PathKind.Array
      ? visitString(join(...(current as string[])), PathKind.String)
      : visitString(current, PathKind.String);

  const visitPathWithBasePath = (current: Path, kind: PathKind) => {
    if (kind === PathKind.PathWithBasePath) {
      const pathWithBasePath = current as PathWithBasePath;
      const basePath = pathVisitor.visit(pathWithBasePath.basePath);
      const currentPath = pathVisitor.visit(pathWithBasePath.path);
      return pathVisitor.visit(join(basePath.path, currentPath.path));
    }

    return visitArray(current, kind);
  };

  const visitPathMeta = (current: Path, kind: PathKind) => {
    return kind === PathKind.PathMeta
      ? path(current)
      : visitPathWithBasePath(current, kind);
  };

  const visitFlexiPath = (current: Path, kind: PathKind) => {
    return kind === PathKind.FlexiPath
      ? (current as FlexiPath)
      : visitPathMeta(current, kind);
  };

  const visit = (current: Path): FlexiPath => {
    const kind = pathKind(current);

    return visitFlexiPath(current, kind);
  };

  return { visit };
})();

/**
 * Used for parsing a `Path` into a `FlexiPath`
 * @category path
 * @param path The `Path` to parse
 * @returns Then parsed `path`
 */
const parse = (current: Path): FlexiPath => {
  return pathVisitor.visit(current);
};

export default parse;
