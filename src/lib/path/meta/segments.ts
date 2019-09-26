import { sep } from "path";

import { isEmpty, isRoot } from ".";

/**
 * @category path
 */
const segments = (path: string) => {
  if (isEmpty(path)) {
    return [];
  }

  return isRoot(path) ? [path] : path.split(sep);
};

export default segments;
