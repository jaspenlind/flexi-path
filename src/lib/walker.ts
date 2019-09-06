import flexi, { FlexiPath, WalkedPath, WalkUntil } from "..";

/**
 * @category walker
 */
const walk = (
  path: FlexiPath,
  until: WalkUntil,
  acc?: FlexiPath
): WalkedPath => {
  const parent = path.parent();
  const diff = acc || flexi.empty();

  if (until(path)) {
    return { diff, path };
  }

  if (parent.isEmpty()) {
    return { diff, path: flexi.empty() };
  }

  return walk(parent, until, diff.prepend(path.base));
};

/**
 * @category walker
 */
const walker = {
  walk: (path: FlexiPath, until: WalkUntil) => walk(path, until)
};

export default walker;
