import flexi, {
  BackwardsWalkedPath,
  FlexiPath,
  Path,
  PathType,
  Walking,
  WalkUntil
} from "..";

/**
 * Walks a `path` backwards
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walkBack = (
  path: Path,
  options?: {
    until?: WalkUntil;
    onWalk?: Walking;
  },
  acc?: FlexiPath
): BackwardsWalkedPath => {
  const parsedPath = flexi.path(path);
  const parent = parsedPath.parent();
  const diff = acc || flexi.empty();
  if (options && options.onWalk) {
    options.onWalk(parsedPath);
  }

  if (options && options.until && options.until(parsedPath)) {
    return { diff, result: parsedPath };
  }

  if (parent.isEmpty()) {
    return { diff, result: flexi.empty() };
  }

  return walkBack(parent, options, diff.prepend(parsedPath.base));
};

/**
 * Walks a `path`
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walk = (
  path: Path,
  options?: {
    until?: WalkUntil;
    onWalk?: Walking;
  }
): FlexiPath[] => {
  const parsedPath = flexi.path(path);
  if (options && options.onWalk) {
    options.onWalk(parsedPath);
  }

  if (parsedPath.isEmpty() || !parsedPath.exists()) {
    return [];
  }

  const content = parsedPath.children();

  const until = options && options.until;

  if (until !== undefined) {
    const result = content.filter(x => until(x));

    if (result.length > 0) {
      return result;
    }
  }

  let walked = content.reduce<FlexiPath[]>(
    (prev: FlexiPath[], curr: FlexiPath) => {
      const result: FlexiPath[] = [];

      if (curr.type() === PathType.Directory) {
        const next = parsedPath.append(curr.name);

        result.push(...walk(next, options));
      }

      if (result.length === 0) {
        result.push(curr);
      }

      prev.push(...result);

      return prev;
    },
    []
  );

  if (walked.length > 0 && until !== undefined) {
    walked = walked.filter(x => until(x));
  }

  return walked;
};

/**
 * @category walker
 */
const walker = {
  walk,
  walkBack
};

export default walker;
