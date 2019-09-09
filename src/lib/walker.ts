import flexi, { FlexiPath, PathType, WalkedPath, WalkUntil } from "..";

/**
 * Walked a `path` backwards
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walkBack = (
  path: FlexiPath,
  until?: WalkUntil,
  acc?: FlexiPath
): WalkedPath => {
  const parent = path.parent();
  const diff = acc || flexi.empty();

  if (until && until(path)) {
    return { diff, result: path };
  }

  if (parent.isEmpty()) {
    return { diff, result: flexi.empty() };
  }

  return walkBack(parent, until, diff.prepend(path.base));
};

const walk = (path: FlexiPath, until?: WalkUntil): FlexiPath[] => {
  if (path.isEmpty() || !path.exists()) {
    return [];
  }

  const content = path.children();

  if (until !== undefined) {
    const result = content.filter(x => until(x));

    if (result.length > 0) {
      return result;
    }
  }

  let walked = content.reduce<FlexiPath[]>(
    (prev: FlexiPath[], curr: FlexiPath) => {
      const next =
        curr.type() === PathType.Directory
          ? walk(path.append(curr.name), until)
          : [];

      if (next.length === 0) {
        next.push(curr);
      }

      prev.push(...next);

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
