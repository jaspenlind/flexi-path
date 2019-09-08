import { join } from "path";

import flexi, { FlexiPath, ParentQuery, Path } from "..";
import { parse } from "./path";
import { parentUntil } from "./resolve/strategies";

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
const parent = (path: Path): ParentQuery => (query?: any): FlexiPath => {
  const parsed = parse(path);
  if (parsed.isEmpty() || parsed.isRoot()) {
    return flexi.empty();
  }

  const condition = query as (current: FlexiPath) => boolean;

  return (
    (condition && flexi.resolve(parsed, parentUntil(condition))) ||
    parse(parentPath(parsed))
  );
};

export default parent;
