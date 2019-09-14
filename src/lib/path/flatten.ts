import { flexi, FlexiPath, PathMeta, walker } from "..";
/**
 * Flattens a `path`
 * @category path
 * @param path The `path` to `flattern`
 * @returns An array with the flatterned `path`
 */
const flatten = (path: string): FlexiPath[] => {
  if (flexi.isEmpty(path)) {
    return [];
  }

  const result: FlexiPath[] = [];

  walker.back(path, {
    until: (current: PathMeta) => {
      result.unshift(
        flexi.path(current.isRoot() ? current.root : current.base)
      );
      return flexi
        .path(current.path)
        .parent()
        .isEmpty();
    }
  });

  return result;
};

/**
 * @ignore
 */
export const flatReduce = (
  filter: (prev: string[], current: string[]) => string[],
  path: string,
  ...paths: string[]
): FlexiPath => {
  if (flexi.isEmpty(path) || paths.find(x => flexi.isEmpty(x))) {
    return flexi.empty();
  }
  const flattenedPath = flatten(path).map(x => x.path);

  const flattenedPaths = paths.map(x => flatten(x).map(z => z.path));

  const result = flattenedPaths.reduce((prev: string[], current: string[]) => {
    return filter(prev, current);
  }, flattenedPath);

  return result.reduce<FlexiPath>(
    (prev: FlexiPath, current: string) => prev.append(current),
    flexi.empty()
  );
};

export default flatten;
