import flexi, {
  FlexiPath,
  ResolveOptions,
  NavigationState,
  PathResolverStrategy,
  Path
} from "..";

import getState from "./state";

const resolve = (
  path: Path,
  options: ResolveOptions | PathResolverStrategy
): FlexiPath | null => {
  const currentPath: FlexiPath =
    typeof path === "object" ? { ...path } : flexi.path(path);
  let currentOptions: ResolveOptions;

  const pathResolver = options as PathResolverStrategy;
  if (pathResolver.resolve) {
    currentOptions = pathResolver.resolve(currentPath);
  } else {
    currentOptions = options as ResolveOptions;
  }

  const state = getState(currentPath, currentOptions);

  if (state === NavigationState.Found) {
    return currentPath;
  }

  const parent = currentPath.parent();

  if (state === NavigationState.Abort || parent === null) {
    return null;
  }

  return resolve(parent, currentOptions);
};

export default resolve;
