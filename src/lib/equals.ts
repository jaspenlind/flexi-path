import flexi, { FlexiPath, Path, PathType } from "..";
import { constants } from "./meta";

/**
 * @ignore
 */
const trimTrailingSep = (path: FlexiPath): FlexiPath => {
  if (path.path.endsWith(constants.sep)) {
    return flexi.path(path.parent()).append(path.base);
  }

  return path;
};

/**
 * @ignore
 */
const compareablePath = (
  path: Path,
  ignoreFileExtension: boolean
): FlexiPath => {
  let parsed = flexi.path(path);

  if (parsed.type() === PathType.File && ignoreFileExtension) {
    parsed = flexi.path(parsed.parent()).append(parsed.name);
  }

  return trimTrailingSep(parsed);
};

/**
 * @category path
 */
const equals = (
  path: Path,
  other: Path,
  options?: { ignoreFileExtension?: boolean }
): boolean => {
  const ignoreFileExtension = (options && options.ignoreFileExtension) || false;

  return (
    compareablePath(path, ignoreFileExtension).path ===
    compareablePath(other, ignoreFileExtension).path
  );
};

export default equals;
