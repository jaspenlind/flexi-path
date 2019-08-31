import {
  FlexiPath,
  ResolveOptions,
  PathExistsOptions,
  PathResolverStrategy,
  NavigationState
} from "../..";

const resolve = (options?: PathExistsOptions) => (): ResolveOptions => {
  let exists = false;
  let replacedPath: FlexiPath | null;

  return {
    predicate: (current: FlexiPath) => {
      exists = current.exists();

      if (!exists && options && options.ignoreFileExtensions === true) {
        const parent = current.parent();

        replacedPath =
          (parent && parent.files().find(x => x.name === current.name)) || null;

        exists = replacedPath !== null;
      }

      return exists;
    },
    onNavigate: () => {
      const state = exists ? NavigationState.Found : NavigationState.Default;

      return {
        state,
        replace: replacedPath || undefined
      };
    }
  };
};

export const closestExistingPath = (
  options?: PathExistsOptions
): PathResolverStrategy => ({ resolve: resolve(options) });

export default closestExistingPath;
