import flexi, { Path, FlexiPath } from "..";
import { parse } from "./path";
import walker from "./walker";
/**
 * Flattens a `path`
 * @category path
 * @param path The `path` to `flattern`
 * @returns An array with the flatterned `path`
 */
const flatten = (path: Path): FlexiPath[] => {
  if (flexi.isEmpty(path)) {
    return [];
  }

  const result: FlexiPath[] = [];

  walker.walk(parse(path), (current: FlexiPath) => {
    result.unshift(flexi.path(current.isRoot() ? current.root : current.base));
    return current.parent().isEmpty();
  });

  return result;
};

/**
 * @ignore
 */
export const flatReduce = (
  filter: (prev: string[], current: string[]) => string[],
  path: Path,
  ...paths: Path[]
): FlexiPath => {
  const parsedPath = parse(path);
  const parsedPaths = (paths || []).map(x => parse(x));

  if (parsedPath.isEmpty() || parsedPaths.find(x => x.isEmpty())) {
    return flexi.empty();
  }
  const flattenedPath = parsedPath.flatten().map(x => x.path);

  const flattenedPaths = parsedPaths.map(x => x.flatten().map(z => z.path));

  const result = flattenedPaths.reduce((prev: string[], current: string[]) => {
    return filter(prev, current);
  }, flattenedPath);

  return result.reduce<FlexiPath>(
    (prev: FlexiPath, current: string) => prev.append(current),
    flexi.empty()
  );
};

export default flatten;
