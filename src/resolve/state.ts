import { FlexiPath, ResolveOptions, NavigationState } from "..";

export const getState = (
  path: FlexiPath,
  options: ResolveOptions
): [NavigationState, FlexiPath | null] => {
  let state = options.predicate(path)
    ? NavigationState.Found
    : NavigationState.Default;

  let replacedPath: FlexiPath | undefined;

  if (options.onNavigate) {
    const result = options.onNavigate(path);
    state = result.state;
    replacedPath = result.replace;
  }

  return [state, replacedPath || null];
};

export default getState;
