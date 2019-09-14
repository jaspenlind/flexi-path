import { existsSync } from "fs";

import { Path } from "../..";
import { pathString } from "../parse";
/**
 * `boolean` value indicating if the `path` exists or not
 * @category path
 */
const exists = (path: Path) => {
  return existsSync(pathString(path));
};

export default exists;
