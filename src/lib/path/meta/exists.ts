import { existsSync } from "fs";

import { Path } from "../../../types";
import { pathString } from "../parse";
import { isEmpty } from ".";

/**
 * `boolean` value indicating if the `path` exists or not
 * @category path
 */
export const exists = (path: Path): boolean => {
  const pathAsString = pathString(path);
  if (isEmpty(pathAsString)) {
    return false;
  }

  return existsSync(pathAsString);
};
