import { flexi, FlexiPath, Path, PathType, WalkedPath, WalkOptions } from "..";
import reporter from "./reporter";
/**
 * Walks a `path`
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const forward = (
  path: Path,
  options?: WalkOptions
): WalkedPath<FlexiPath[]> => {
  const parsedPath = flexi.path(path);

  reporter(options).report(parsedPath);

  if (parsedPath.isEmpty() || !parsedPath.exists()) {
    return { result: [], diff: [] };
  }

  const content = parsedPath.children();

  const untilFunc = options && options.until;

  if (untilFunc !== undefined) {
    const result = content.filter(x => untilFunc(x));

    if (result.length > 0) {
      return { result, diff: [] };
    }
  }

  let walked = content.reduce<FlexiPath[]>(
    (prev: FlexiPath[], curr: FlexiPath) => {
      const result: FlexiPath[] = [];

      if (curr.type() === PathType.Directory) {
        const next = parsedPath.append(curr.name);

        result.push(...forward(next, options).result);
      }

      if (result.length === 0) {
        result.push(curr);
      }

      prev.push(...result);

      return prev;
    },
    []
  );

  if (walked.length > 0 && untilFunc !== undefined) {
    walked = walked.filter(x => untilFunc(x));
  }

  return { result: walked, diff: [] };
};

export default forward;
