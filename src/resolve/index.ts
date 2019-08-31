import {
  FlexiPath,
  ResolveOptions,
  NavigationState,
  PathResolverStrategy,
  Path,
  parse
} from "..";

import getState from "./state";

/**
 * Navigates the `path` until a condition is met
 */
const resolve = (
  path: Path,
  options: ResolveOptions | PathResolverStrategy
): FlexiPath | null => {
  const currentPath = parse(path);
  // const currentPath: FlexiPath =
  //   typeof path === "object" ? { ...path } : flexi.path(path);
  let currentOptions: ResolveOptions;

  const pathResolver = options as PathResolverStrategy;
  if (pathResolver.resolve) {
    currentOptions = pathResolver.resolve(currentPath);
  } else {
    currentOptions = options as ResolveOptions;
  }

  const [state, replacerPath] = getState(currentPath, currentOptions);

  if (state === NavigationState.Found) {
    return replacerPath || currentPath;
  }

  const parent = currentPath.parent();

  if (state === NavigationState.Abort || parent === null) {
    return null;
  }

  return resolve(parent, currentOptions);
};

export default resolve;
