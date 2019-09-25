import { sep } from "path";

import { isEmpty, isRoot } from ".";

const segments = (path: string) => {
  if (isEmpty(path)) {
    return [];
  }

  return isRoot(path) ? [path] : path.split(sep);
};

export default segments;
