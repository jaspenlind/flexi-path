import {
  FlexiPath,
  PathExistsOptions,
  ResolveOptions,
  NavigationState
} from "../..";

const resolve = (
  path: FlexiPath,
  options?: PathExistsOptions
): ResolveOptions => {
  let result: FlexiPath | null;

  const predicate = (current: FlexiPath) => {
    if (result === undefined) {
      result = current.path === path.path ? current : null;
    }

    return result !== null;
  };

  const onNavigate = (current: FlexiPath) => {
    let exists = predicate(current);

    if (!exists && options && options.ignoreFileExtensions === true) {
      const currentParent = current.parent();
      const pathParent = path.parent();

      if (currentParent && pathParent) {
        exists =
          currentParent.path === pathParent.path && current.name === path.name;
      }
    }
    return {
      state: exists ? NavigationState.Found : NavigationState.Default
    };
  };

  return {
    predicate,
    onNavigate
  };
};

export const equals = (path: FlexiPath, options?: PathExistsOptions) => ({
  resolve: () => resolve(path, options)
});

export default equals;
