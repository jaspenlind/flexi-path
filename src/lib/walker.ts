import flexi, { FlexiPath, WalkUntil, WalkedPath } from "..";

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
    return { path, diff };
  }

  if (parent.isEmpty()) {
    return { path: flexi.empty(), diff };
  }

  return walk(parent, until, diff.prepend(path.base));
};

/**
 * @category walker
 */
export const walker = {
  walk: (path: FlexiPath, until: WalkUntil) => walk(path, until)
};

export default walker;
