import { parse } from "path";

import { Path } from "../../../types";
import { constants, pathString } from "../parse";

/**
 * `boolean` value indicating the path has a [[root]]
 * @category path
 */
export const hasRoot = (path: Path): boolean => parse(pathString(path)).root === constants.sep;
