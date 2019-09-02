import { FlexiPath, PathExistsOptions } from "../..";

export const equals = (path: FlexiPath, options?: PathExistsOptions) => {
  let areEqual: boolean;

  const predicate = (current: FlexiPath) => {
    if (areEqual === undefined) {
      areEqual = current.path === path.path;

      if (!areEqual && options && options.ignoreFileExtensions) {
        const parent = current.parent();

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
