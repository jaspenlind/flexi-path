import flexi, {
  FlexiPath,
  ResolveOptions,
  PathResolverStrategyOptions,
  NavigationState
} from "../..";
import { equals } from ".";

const resolve = (
  path: FlexiPath,
  options?: PathResolverStrategyOptions
): ResolveOptions => {
  let parent: FlexiPath | null;
  let result: boolean;
  const predicate = (current: FlexiPath) => {
    if (parent === undefined) {
      parent = path;
    } else {
      parent = parent && parent.parent();
    }

    result = (parent && flexi.resolve(parent, equals(current))) !== null;

    return result;
  };

  const onNavigate = (current: FlexiPath, state: NavigationState) => {
    if (options && options.onNavigate) {
      options.onNavigate(parent, current, state);
    }
    return { state };
  };

  return {
    predicate,
    onNavigate
  };
};

export const closestCommonParent = (
  path: FlexiPath,
  options?: PathResolverStrategyOptions
) => ({
  resolve: () => resolve(path, options)
});

export default closestCommonParent;
