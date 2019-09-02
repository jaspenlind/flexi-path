import flexi, { FlexiPath, WalkUntil, WalkedPath } from ".";

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

export const walker = {
  walk: (path: FlexiPath, until: WalkUntil) => walk(path, until)
};

export default walker;
