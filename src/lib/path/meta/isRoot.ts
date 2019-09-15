import { Path } from "../../../types";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating if the `path` is a `root` path
 * @category path
 */
const isRoot = (path: Path) => pathString(path) === constants.sep;

export default isRoot;
