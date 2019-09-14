import { parse } from "path";

import { concat, constants, parent } from "..";
import { flexi } from "../..";
import { FlexiPath, PathType } from "../../../types";
import { type } from ".";

/**
 * @ignore
 */
const trimTrailingSep = (path: string): string => {
  if (path.endsWith(constants.sep)) {
    return concat(parent(path)().path, parse(path).base).path;
  }

  return path;
};

/**
 * @ignore
 */
const compareablePath = (
  path: string,
  ignoreFileExtension: boolean
): FlexiPath => {
  let newPath = path;

  if (type(path) === PathType.File && ignoreFileExtension) {
    newPath = flexi.concat(parent(path)(), parse(path).name).path;
  }

  return flexi.path(trimTrailingSep(newPath));
};

/**
 * @category path
 */
const equals = (
  path: string,
  other: string,
  options?: { ignoreFileExtension?: boolean }
): boolean => {
  const ignoreFileExtension = (options && options.ignoreFileExtension) || false;

  return (
    compareablePath(path, ignoreFileExtension).path ===
    compareablePath(other, ignoreFileExtension).path
  );
};

export default equals;
