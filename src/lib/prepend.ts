import { Path, FlexiPath } from "..";
import { parse, concat } from "./path";
/**
 * Prepend `paths` to the `path`
 * @category path
 * @param path The `path` to prepend
 * @param paths One or multiple `paths` to prepend the `path` with
 */
const prepend = (path: Path, ...paths: Path[]): FlexiPath => {
  const allPaths = [...paths, path];

  if (allPaths.length > 1) {
    const [first, ...rest] = allPaths;
    return concat(first, ...rest);
  }

  return parse(path);
};

export default prepend;
