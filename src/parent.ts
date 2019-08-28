import { join } from "path";
import flexi, { FlexiPath, isRoot, isValid, ParentQuery } from ".";

export const up = "../";
export const parentPath = (path: string): string => join(path, up);

export const parent = (childPath: string | FlexiPath): ParentQuery => (
  numberOfLevels?: any
): FlexiPath | null => {
  const path = typeof childPath === "object" ? childPath.path : childPath;

  if (!isValid(path) || isRoot(path)) {
    return null;
  }

  const levelsToNavigate = ((numberOfLevels as number) || 1) - 1;

  const pathOfParent = parentPath(path);

  let current: FlexiPath | null = flexi.path(pathOfParent);

  if (levelsToNavigate > 0) {
    current = parent(current)(levelsToNavigate);
  }

  return current;
};

export default parent;
