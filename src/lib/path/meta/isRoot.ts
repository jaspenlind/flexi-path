import { Path } from "../../../types";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating if the `path` is a `root` path
 * @category path
 */
export const isRoot = (path: Path): boolean => pathString(path) === constants.sep;
