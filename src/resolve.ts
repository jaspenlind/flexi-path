import flexi, { FlexiPath, ResolveOptions, NavigationState } from ".";

export const getState = (
  path: FlexiPath,
  options: ResolveOptions
): NavigationState => {
  let state = options.predicate(path)
    ? NavigationState.Found
    : NavigationState.Default;

  if (options.onNavigate) {
    state = options.onNavigate(path);
  }

  return state;
};

export const resolve = (
  path: string | FlexiPath,
  options: ResolveOptions
): FlexiPath | null => {
  const current: FlexiPath | null =
    typeof path === "object" ? path : flexi.path(path);

  const state = getState(current, options);

  if (state === NavigationState.Found) {
    return current;
  }

  const parent = current.parent();

  return state === NavigationState.Abort || parent === null
    ? null
    : resolve(parent, options);
};

export default resolve;
