import { Path, PathType } from "../..";
import { parse, exists, isValid, stats, constants } from ".";

/**
 * @ignore
 */
const guessType = (path: Path): PathType => {
  const parsed = parse(path);
  if (!isValid(parsed)) {
    return PathType.Unknown;
  }
  const maybeFile =
    (parsed.ext !== "" || !parsed.path.endsWith(constants.sep)) &&
    parsed.parent() !== null;

  return maybeFile ? PathType.File : PathType.Directory;
};

/**
 * Gets `type` for a `path``
 * @category path
 * @param path The `path` to get the `type` for
 * @returns `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
 * on disk is `Unknown`
 */
const type = (path: Path): PathType => {
  if (!exists(path)) {
    return guessType(path);
  }

  const stat = stats(path);

  return (
    (stat && stat.isDirectory() && PathType.Directory) ||
    (stat && stat.isFile() && PathType.File) ||
    PathType.Unknown
  );
};

export default type;
