import { join } from "path";

import { flexi } from "..";
import { FlexiPath, ParentQuery, Path, PathMeta } from "../../types";
import walker from "../walker";
import { isEmpty, isRoot, parse } from ".";

/**
 * @ignore
 */
export const up = "../";
/**
 * @ignore
 */
export const parentPath = (path: Path): Path => {
  const pathAsString = parse(path).path;
  const joinedPath = join(pathAsString, up);

  return joinedPath === "./" || joinedPath === ".\\" ? flexi.empty() : parse(joinedPath);
};

/**
 * The `parent` directory of the `path`
 * @category path
 */
const parent = (path: string): ParentQuery => (condition?: (current: PathMeta) => boolean): FlexiPath => {
  if (isEmpty(path) || isRoot(path)) {
    return flexi.empty();
  }

  return condition ? walker.back(path, { until: condition }).result : parse(parentPath(path));
};

export default parent;
