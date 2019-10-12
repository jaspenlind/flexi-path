import { parse } from "path";

import { constants, parent } from "..";
import { PathType } from "../../../types";
import { exists, isValid, stats } from ".";

export { PathType } from "../../../types";

/**
 * @ignore
 */
const guessType = (path: string): PathType => {
  if (!isValid(path)) {
    return PathType.Unknown;
  }

  const maybeFile =
    parse(path).ext !== "" || (!path.endsWith(constants.sep) && parent(path)().path !== constants.empty);

  return maybeFile ? PathType.File : PathType.Directory;
};

/**
 * Gets `type` for a `path``
 * @category path
 * @param path The `path` to get the `type` for
 * @returns `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
 * on disk is `Unknown`
 */
const type = (path: string): PathType => {
  if (!exists(path)) {
    return guessType(path);
  }

  const stat = stats(path);

  return (
    (stat && stat.isDirectory() && PathType.Directory) || (stat && stat.isFile() && PathType.File) || PathType.Unknown
  );
};

export default type;
