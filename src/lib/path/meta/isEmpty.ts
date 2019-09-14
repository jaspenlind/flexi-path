import { Path } from "../..";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating if the `path` is [[empty]]
 * @category path
 */
const isEmpty = (path: Path | null): boolean =>
  path === null || pathString(path) === constants.empty;

export default isEmpty;
