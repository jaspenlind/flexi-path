import { join } from "path";

import flexi, { FlexiPath, ParentQuery, Path } from "..";
import { parse } from "./path";
import walker from "./walker";

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
const parent = (path: Path): ParentQuery => (condition?: any): FlexiPath => {
  const parsed = parse(path);
  if (parsed.isEmpty() || parsed.isRoot()) {
    return flexi.empty();
  }

  const typedCondition = condition as (current: FlexiPath) => boolean;

  return typedCondition
    ? walker.walkBack(parsed, typedCondition).result
    : parse(parentPath(path));
};

export default parent;
