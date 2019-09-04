import flexi, {
  FlexiPath,
  ResolveOptions,
  NavigationState,
  Path,
  WalkedPath
} from "../../..";
import { parse } from "..";
import walker from "../../walker";

/**
 * @ignore
 */
const parseOptions = (
  options: ResolveOptions
): ((current: FlexiPath) => ResolveOptions) => {
  return () => options;
};

/**
 * @ignore
 */
const walkUntil = (
  current: FlexiPath,
  options: (current: FlexiPath) => ResolveOptions
): NavigationState => {
  let state = NavigationState.Default;
  const currentOptions = options(current);

  if (currentOptions.predicate) {
    state =
      currentOptions.predicate(current, state) === true
        ? NavigationState.Found
        : state;
  }

  if (currentOptions.onNavigate) {
    const navigationResult = currentOptions.onNavigate(current, state);
    state = navigationResult.state;
  }

  return state;
};

/**
 * @ignore
 */
const walk = (path: Path, options: ResolveOptions): WalkedPath => {
  const parsedPath = parse(path);
  const parsedOptions = parseOptions(options);

  if (parsedPath.isEmpty()) {
    return { path: flexi.empty(), diff: flexi.empty() };
  }

  let aborted = false;

  const result = walker.walk(parsedPath, (current: FlexiPath) => {
    const state = walkUntil(current, parsedOptions);

    if (state === NavigationState.Abort) {
      aborted = true;
    }

    return state === NavigationState.Abort || state === NavigationState.Found;
  });

  if (aborted) {
    return { path: flexi.empty(), diff: flexi.empty() };
  }

  return result;
};

/**
 * @category resolver
 * @category walker
 */
export const diff = (path: Path, options: ResolveOptions): FlexiPath => {
  return walk(path, options).diff;
};

/**
 * @category resolver
 * @category walker
 */
export const resolve = (path: Path, options: ResolveOptions): FlexiPath => {
  return walk(path, options).path;
};

export default { resolve, diff };
