import flexi, {
  BackwardsWalkedPath,
  FlexiPath,
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
  path: FlexiPath,
  options?: {
    until?: WalkUntil;
    onWalk?: Walking;
  },
  acc?: FlexiPath
): BackwardsWalkedPath => {
  const parent = path.parent();
  const diff = acc || flexi.empty();

  if (options && options.onWalk) {
    options.onWalk(path);
  }

  if (options && options.until && options.until(path)) {
    return { diff, result: path };
  }

  if (parent.isEmpty()) {
    return { diff, result: flexi.empty() };
  }

  return walkBack(parent, options, diff.prepend(path.base));
};

/**
 * Walks a `path`
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walk = (
  path: FlexiPath,
  options?: {
    until?: WalkUntil;
    onWalk?: Walking;
  }
): FlexiPath[] => {
  if (options && options.onWalk) {
    options.onWalk(path);
  }

  if (path.isEmpty() || !path.exists()) {
    return [];
  }

  const content = path.children();

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
        const next = path.append(curr.name);

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
