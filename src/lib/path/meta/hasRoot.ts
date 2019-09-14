import { parse } from "path";

import { Path } from "../..";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating the path has a [[root]]
 * @category path
 */
const hasRoot = (path: Path) => parse(pathString(path)).root === constants.sep;

export default hasRoot;
