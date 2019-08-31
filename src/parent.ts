import { join } from "path";
import { FlexiPath, isRoot, isValid, ParentQuery, Path, parse } from ".";

export const up = "../";
export const parentPath = (path: Path): Path =>
  parse(join(parse(path).path, up));

/**
 * The `parent` directory of the `path`
 */
export const parent = (path: Path): ParentQuery => (
  numberOfLevels?: any
): FlexiPath | null => {
  if (!isValid(path) || isRoot(path)) {
    return null;
  }

  const levelsToNavigate = ((numberOfLevels as number) || 1) - 1;

  let current: FlexiPath | null = parse(parentPath(path));

  if (levelsToNavigate > 0) {
    current = parent(current)(levelsToNavigate);
  }

  return current;
};

export default parent;
