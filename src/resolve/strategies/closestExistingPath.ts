import { FlexiPath, PathExistsOptions } from "../..";

export const closestExistingPath = (options?: PathExistsOptions) => {
  const predicate = (current: FlexiPath) => {
    let exists = current.exists();

    if (!exists && options && options.ignoreFileExtensions === true) {
      const parent = current.parent();

      exists =
        (parent && parent.files().find(x => x.name === current.name)) !==
        undefined;
    }

    return exists;
  };

  return {
    predicate
  };
};

export default closestExistingPath;
