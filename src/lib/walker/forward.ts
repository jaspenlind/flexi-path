import { create, empty } from "../../models/walked-path";
import { flexi } from "..";
import { FlexiPath, Path, PathType, WalkedPath, WalkOptions } from "../../types";
import reporter from "./reporter";

/**
 * @ignore
 */
const emptyPath = (path: FlexiPath): WalkedPath<FlexiPath[]> | null =>
  path.isEmpty() || !path.exists() ? empty : null;

/**
 * @ignore
 */
const untilPath = (paths: FlexiPath[], options?: WalkOptions): WalkedPath<FlexiPath[]> | null => {
  const untilFunc = options?.until;

  if (typeof untilFunc === "undefined" || paths.length === 0) {
    return null;
  }

  const result = paths.filter((x) => untilFunc(x));

  if (result.length > 0) {
    return create({ result });
  }

  return null;
};

/**
 * @ignore
 */
const walkPath = (path: FlexiPath, options?: WalkOptions | undefined) => {
  let walked = path.children().reduce<FlexiPath[]>((prev: FlexiPath[], curr: FlexiPath) => {
    const result: FlexiPath[] = [];

    if (curr.type() === PathType.Directory) {
      const next = path.append(curr.name);
      // eslint-disable-next-line no-use-before-define
      result.push(...forward(next, options).result);
    }

    if (result.length === 0) {
      result.push(curr);
    }

    prev.push(...result);

    return prev;
  }, []);

  const untilFunc = options?.until;

  if (walked.length > 0 && typeof untilFunc !== "undefined") {
    walked = walked.filter((x) => untilFunc(x));
  }

  return walked;
};

/**
 * Walks a `path`
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const forward = (path: Path, options?: WalkOptions): WalkedPath<FlexiPath[]> => {
  const parsedPath = flexi.path(path);

  reporter(options).report(parsedPath);

  return (
    emptyPath(parsedPath) ||
    untilPath(parsedPath.children(), options) ||
    create({ result: walkPath(parsedPath, options) })
  );
};

export default forward;
