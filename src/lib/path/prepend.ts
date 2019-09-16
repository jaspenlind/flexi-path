import { FlexiPath } from "../../types";
import { concat, parse } from ".";

/**
 * Prepend `paths` to the `path`
 * @category path
 * @param path The `path` to prepend
 * @param paths One or multiple `paths` to prepend the `path` with
 */
const prepend = (path: string, ...paths: string[]): FlexiPath => {
  if (paths.length === 0) {
    return parse(path);
  }
  const allPaths = [...paths, path];

  if (allPaths.length > 1) {
    const [first, ...rest] = allPaths;
    return concat(first, ...rest);
  }

  return parse(path);
};

export default prepend;
