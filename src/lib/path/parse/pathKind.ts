import { FlexiPath, Path, PathKind, PathMeta, PathVistor, PathWithBasePath } from "../../../types";

/**
 * @ignore
 */
const pathKindVisitor = ((): PathVistor<PathKind> => {
  const visitString = (current: Path) => (typeof current === "string" ? PathKind.String : PathKind.Unknown);

  const visitArray = (current: Path) => (Array.isArray(current) ? PathKind.Array : visitString(current));

  const visitPathWithBasePath = (current: Path) => {
    const pathWithBasePath = current as PathWithBasePath;

    return typeof pathWithBasePath.basePath !== "undefined" ? PathKind.PathWithBasePath : visitArray(current);
  };

  const visitPathMeta = (current: Path) => {
    const pathAsMeta = current as PathMeta;
    return typeof pathAsMeta.root === "string" ? PathKind.PathMeta : visitPathWithBasePath(current);
  };

  const visitFlexiPath = (current: Path) => {
    const flexiPath = current as FlexiPath;
    return typeof flexiPath.append !== "undefined" ? PathKind.FlexiPath : visitPathMeta(current);
  };

  const visit = (current: Path) => visitFlexiPath(current);

  return { visit };
})();

/**
 * Returns the [[PathKind]] of a `path`
 * @param path The `path` to get the kind for
 * @category path
 */
export const pathKind = (path: Path): PathKind => pathKindVisitor.visit(path);
