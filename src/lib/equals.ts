import flexi, { FlexiPath, Path, PathType } from "..";
import { constants } from "./path";

const trimTrailingSep = (path: FlexiPath): FlexiPath => {
  if (path.path.endsWith(constants.sep)) {
    return flexi.path(path.parent()).append(path.base);
  }

  return path;
};

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

const equals = (
  path: Path,
  other: Path,
  options?: { ignoreFileExtension?: boolean }
): boolean => {
  const ignoreFileExtension = (options && options.ignoreFileExtension) || false;

  console.log(compareablePath(path, ignoreFileExtension).path);
  console.log(compareablePath(other, ignoreFileExtension).path);

  return (
    compareablePath(path, ignoreFileExtension).path ===
    compareablePath(other, ignoreFileExtension).path
  );
};

export default equals;
