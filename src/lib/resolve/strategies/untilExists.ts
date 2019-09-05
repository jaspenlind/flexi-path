import { FlexiPath, PathExistsOptions, ResolveOptions } from "../../..";

/**
 * Walks a `path` until it [[exists]]
 * @category resolver
 * @param options Resolver options
 */
const untilExists = (options?: PathExistsOptions): ResolveOptions => {
  const predicate = (current: FlexiPath) => {
    let exists = current.exists();

    if (!exists && options && options.ignoreFileExtensions === true) {
      exists =
        current
          .parent()
          .files()
          .find(x => x.name === current.name) !== undefined;
    }

    return exists;
  };

  return {
    predicate
  };
};

export default untilExists;
