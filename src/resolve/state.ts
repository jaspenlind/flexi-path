import { FlexiPath, ResolveOptions, NavigationState } from "..";

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

export default getState;
