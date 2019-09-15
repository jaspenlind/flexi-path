import { flexi } from "..";
import { FlexiPath, Path, WalkedPath, WalkOptions } from "../../types";
import reporter from "./reporter";

/**
 * Walks a `path` backwards
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const back = (
  path: Path,
  options?: WalkOptions,
  acc?: FlexiPath
): WalkedPath<FlexiPath> => {
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

  return back(parent, options, diff.prepend(parsedPath.base));
};

export default back;
