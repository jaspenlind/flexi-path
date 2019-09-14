import { join } from "path";

import { flexi, FlexiPath, ParentQuery, Path, PathMeta, walker } from "..";
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

  return joinedPath === "./" || joinedPath === ".\\"
    ? flexi.empty()
    : parse(joinedPath);
};

/**
 * The `parent` directory of the `path`
 * @category path
 */
const parent = (path: string): ParentQuery => (condition?: any): FlexiPath => {
  // const parsed = parse(path);
  if (isEmpty(path) || isRoot(path)) {
    return flexi.empty();
  }

  const typedCondition = condition as (current: PathMeta) => boolean;

  return typedCondition
    ? walker.back(path, { until: typedCondition }).result
    : parse(parentPath(path));
};

export default parent;
