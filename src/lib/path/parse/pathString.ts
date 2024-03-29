import { join, normalize } from "path";

import { constants } from "..";
import { FlexiPath, Path, PathKind, PathMeta, PathVistor, PathWithBasePath } from "../../../types";
import { pathKind } from "./pathKind";

/** @ignore */
const pathStringVisitor = ((): PathVistor<string> => {
  const visitString = (current: Path, kind: PathKind) => {
    return kind === PathKind.String ? normalize(current as string) : constants.empty;
  };

  const visitArray = (current: Path, kind: PathKind) => {
    return kind === PathKind.Array
      ? visitString(join(...(current as string[])), PathKind.String)
      : visitString(current, PathKind.String);
  };

  const visitPathWithBasePath = (current: Path, kind: PathKind) => {
    if (kind === PathKind.PathWithBasePath) {
      const pathWithBasePath = current as PathWithBasePath;
      const basePath = pathStringVisitor.visit(pathWithBasePath.basePath);
      const currentPath = pathStringVisitor.visit(pathWithBasePath.path);
      return visitArray([basePath, currentPath], PathKind.Array);
    }

    return visitArray(current, kind);
  };

  const visitMeta = (current: Path, kind: PathKind) =>
    kind === PathKind.PathMeta ? (current as PathMeta).path : visitPathWithBasePath(current, kind);

  const visitFlexiPath = (current: Path, kind: PathKind) =>
    kind === PathKind.FlexiPath ? (current as FlexiPath).path : visitMeta(current, kind);

  const visit = (current: Path) => {
    const kind = pathKind(current);
    return visitFlexiPath(current, kind);
  };

  return { visit };
})();

/**
 * Returns the path string from a `path`
 * @category path
 */
export const pathString = pathStringVisitor.visit;
