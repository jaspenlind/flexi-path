import flexi, {
  FlexiPath,
  ResolveOptions,
  NavigationState,
  PathResolverStrategy,
  Path,
  parse,
  walker,
  WalkedPath
} from "..";

const parseOptions = (
  options: ResolveOptions | PathResolverStrategy
): ((current: FlexiPath) => ResolveOptions) => {
  let parsed: (current: FlexiPath) => ResolveOptions;
  const pathResolver = options as PathResolverStrategy;

  if (pathResolver.resolve) {
    parsed = (current: FlexiPath) => pathResolver.resolve(current);
  } else {
    parsed = () => options as ResolveOptions;
  }

  return parsed;
};

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

export const walk = (
  path: Path,
  options: ResolveOptions | PathResolverStrategy
): WalkedPath => {
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

export const diff = (
  path: Path,
  options: ResolveOptions | PathResolverStrategy
): FlexiPath => {
  return walk(path, options).diff;
};

export const resolve = (
  path: Path,
  options: ResolveOptions | PathResolverStrategy
): FlexiPath | null => {
  return walk(path, options).path;
};

export default resolve;
