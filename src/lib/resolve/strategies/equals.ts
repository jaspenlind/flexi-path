import flexi, {
  FlexiPath,
  PathExistsOptions,
  PathMeta,
  ResolveOptions
} from "../../..";

/**
 * Compares two `paths`
 * @category resolver
 * @param path The `path` to compare with
 * @param options Resolver options
 */
const equals = (
  path: FlexiPath,
  options?: PathExistsOptions
): ResolveOptions => {
  let areEqual: boolean;

  const predicate = (current: PathMeta) => {
    if (areEqual === undefined) {
      areEqual = current.path === path.path;

      if (!areEqual && options && options.ignoreFileExtensions) {
        const parent = flexi.path(current.path).parent();

        areEqual =
          parent !== null && parent.append(current.name).path === path.path;
      }
    }

    return areEqual;
  };

  return {
    predicate
  };
};

export default equals;
