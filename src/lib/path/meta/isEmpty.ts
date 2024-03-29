import { Path } from "../../../types";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating if the `path` is [[empty]]
 * @category path
 */
export const isEmpty = (path: Path | null): boolean => path === null || pathString(path) === constants.empty;
