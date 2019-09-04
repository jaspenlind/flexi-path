import { FlexiPath, ResolveOptions } from "../../../..";

/**
 * Cuts a `path`
 * @category resolver
 * @param count Number of levels to cut from a `path`
 */
const cut = (count: number): ResolveOptions => {
  let currentCount = 0;

  const predicate = (current: FlexiPath): boolean => {
    const done =
      current.isEmpty() || current.parent().isEmpty() || currentCount >= count;

    currentCount += 1;

    return done;
  };

  return { predicate };
};

export default cut;
