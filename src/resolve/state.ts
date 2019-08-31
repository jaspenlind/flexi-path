import { FlexiPath, ResolveOptions, NavigationState } from "..";

export const getState = (
  path: FlexiPath,
  options: ResolveOptions,
  state: NavigationState
): [NavigationState, FlexiPath | null] => {
  let newState =
    options.predicate && options.predicate(path, state)
      ? NavigationState.Found
      : NavigationState.Default;

  let replacedPath: FlexiPath | undefined;

  if (options.onNavigate) {
    const result = options.onNavigate(path, newState);
    newState = result.state;
    replacedPath = result.replace;
  }

  return [newState, replacedPath || null];
};

export default getState;
