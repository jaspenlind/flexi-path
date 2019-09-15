import { parse } from "path";

import { Path } from "../../../types";
import { constants, pathString } from "../parse";
/**
 * `boolean` value representing if the `path` can be created on the disk
 * @category path
 */
const isValid = (path: Path): boolean => {
  return parse(pathString(path)).root === constants.root;
};

export default isValid;
