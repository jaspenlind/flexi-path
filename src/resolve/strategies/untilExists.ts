import { FlexiPath, PathExistsOptions } from "../..";

export const untilExists = (options?: PathExistsOptions) => {
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
