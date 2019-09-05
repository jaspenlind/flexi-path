import { FlexiPath, ResolveOptions } from "../../..";

/**
 * Navigates up a `path` until then `condition` is met
 * @category resolver
 * @param condition Stops walking `parents` when `true`
 */
const parentUntil = (
  condition: (current: FlexiPath) => boolean
): ResolveOptions => {
  const predicate = (current: FlexiPath) => condition(current);

  return { predicate };
};

export default parentUntil;
