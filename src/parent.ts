import { join } from "path";
import { FlexiPath, isRoot, ParentQuery, Path, parse } from ".";

export const up = "../";
export const parentPath = (path: Path): Path | null => {
  const pathAsString = parse(path).path;
  const joinedPath = join(pathAsString, up);
  return joinedPath === "./" ? null : parse(joinedPath);
};

/**
 * The `parent` directory of the `path`
 */
export const parent = (path: Path): ParentQuery => (
  numberOfLevels?: any
): FlexiPath | null => {
  const parsed = parse(path);
  if (isRoot(parsed)) {
    return null;
  }

  const levelsToNavigate = ((numberOfLevels as number) || 1) - 1;

  let next = parentPath(parsed);

  if (levelsToNavigate > 0 && next !== null) {
    next = parent(next)(levelsToNavigate);
  }

  return (next && parse(next)) || null;
};

export default parent;
