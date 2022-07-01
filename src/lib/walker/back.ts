import { flexi } from "../..";
import { FlexiPath, Path, WalkedPath, WalkOptions } from "../../types";
import reporter from "./reporter";

/**
 * @ignore
 */
const walkUntil = (path: FlexiPath, diff: FlexiPath, options?: WalkOptions): WalkedPath<FlexiPath> | null => {
  if (options?.until && options.until(path)) {
    const result = path.isRoot() ? flexi.root() : path;
    return { diff, result };
  }
  return null;
};

/**
 * @ignore
 */
const emptyOrRoot = (path: FlexiPath, diff: FlexiPath): WalkedPath<FlexiPath> | null => {
  if (path.isRoot()) {
    return { diff, result: flexi.root() };
  }

  if (path.isEmpty() || path.parent().isEmpty()) {
    return { diff, result: flexi.empty() };
  }

  return null;
};

/**
 * Walks a `path` backwards
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
export const back = (path: Path, options?: WalkOptions, acc?: FlexiPath): WalkedPath<FlexiPath> => {
  const parsedPath = flexi.path(path);
  const diff = acc || flexi.empty();
  const diffWithPrependedBase = diff.prepend(parsedPath.base);

  reporter(options).report(parsedPath);

  return (
    walkUntil(parsedPath, diff, options) ||
    emptyOrRoot(parsedPath, diffWithPrependedBase) ||
    back(parsedPath.parent(), options, diffWithPrependedBase)
  );
};
