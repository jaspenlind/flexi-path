import flexi, { PathExistsOptions, PathMeta, ResolveOptions } from "../../..";

/**
 * Walks a `path` until it [[exists]]
 * @category resolver
 * @param options Resolver options
 */
const untilExists = (options?: PathExistsOptions): ResolveOptions => {
  const predicate = (current: PathMeta) => {
    let exists = current.exists();

    if (!exists && options && options.ignoreFileExtensions === true) {
      exists =
        flexi
          .path(current.path)
          .parent()
          .files(x => x.name === current.name).length > 0;
    }
    // move to walker
    return exists;
  };

  return {
    predicate
  };
};

export default untilExists;
