import flexi, { FlexiPath, ResolveOptions, NavigationState } from ".";

export const resolve = (
  path: string | FlexiPath,
  options: ResolveOptions
): FlexiPath | null => {
  let current: FlexiPath | null =
    typeof path === "object" ? path : flexi.path(path);

  let state = NavigationState.Default;

  if (options.predicate(current)) {
    state = NavigationState.Found;
  }

  if (options.onNavigate !== undefined) {
    state = options.onNavigate(current);
  }

  if (state === NavigationState.Abort) {
    return null;
  }

  if (state !== NavigationState.Found) {
    const parent = current.parent();

    if (parent !== null) {
      current = resolve(parent, options);

      if (current !== null && options.onNavigate !== undefined) {
        state = options.onNavigate(current);
      } else if (current !== null && options.predicate(current)) {
        state = NavigationState.Found;
      }
    }
  }

  return state === NavigationState.Found ? current : null;
};

export default resolve;
