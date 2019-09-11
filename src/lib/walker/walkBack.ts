import flexi, {
  BackwardsWalkedPath,
  FlexiPath,
  Path,
  WalkOptions
} from "../..";
import { reporter } from ".";

/**
 * Walks a `path` backwards
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walkBack = (
  path: Path,
  options?: WalkOptions,
  acc?: FlexiPath
): BackwardsWalkedPath => {
  const parsedPath = flexi.path(path);
  const parent = parsedPath.parent();
  const diff = acc || flexi.empty();

  reporter(options).report(parsedPath);

  if (options && options.until && options.until(parsedPath)) {
    const result = parsedPath.isRoot() ? flexi.root() : parsedPath;
    return { diff, result };
  }

  if (parent.isEmpty()) {
    return { diff, result: flexi.empty() };
  }

  return walkBack(parent, options, diff.prepend(parsedPath.base));
};

export default walkBack;
