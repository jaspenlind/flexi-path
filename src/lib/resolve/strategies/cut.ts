import flexi, { FlexiPath, PathMeta, ResolveOptions } from "../../..";

/**
 * Cuts a `path`
 * @category resolver
 * @param count Number of levels to cut from a `path`
 */
const cut = (count: number): ResolveOptions => {
  let currentCount = 0;

  const predicate = (current: PathMeta): boolean => {
    const done =
      current.isEmpty() ||
      flexi
        .path(current.path)
        .parent()
        .isEmpty() ||
      currentCount >= count;

    currentCount += 1;

    return done;
  };

  return { predicate };
};

export default cut;
