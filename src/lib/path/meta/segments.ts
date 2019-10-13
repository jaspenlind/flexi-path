import { sep } from "path";

import { isEmpty, isRoot } from ".";

/**
 * @category path
 */
const segments = (path: string) => {
  if (isEmpty(path)) {
    return [];
  }

  if (isRoot(path)) {
    return [path];
  }

  const hasRoot = path.startsWith(sep);

  const result = path.split(sep);

  if (hasRoot) {
    result[0] = sep;
  }

  return result;
};

export default segments;
