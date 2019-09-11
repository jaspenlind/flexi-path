import flexi, { FlexiPath, Path, PathType, WalkOptions } from "../..";
import { reporter } from ".";
/**
 * Walks a `path`
 * @param path The path to walk
 * @param until Stops walking when condition is met
 * @category walker
 */
const walk = (path: Path, options?: WalkOptions): FlexiPath[] => {
  const parsedPath = flexi.path(path);

  reporter(options).report(parsedPath);

  if (parsedPath.isEmpty() || !parsedPath.exists()) {
    return [];
  }

  const content = parsedPath.children();

  const untilFunc = options && options.until;

  if (untilFunc !== undefined) {
    const result = content.filter(x => untilFunc(x));

    if (result.length > 0) {
      return result;
    }
  }

  let walked = content.reduce<FlexiPath[]>(
    (prev: FlexiPath[], curr: FlexiPath) => {
      const result: FlexiPath[] = [];

      if (curr.type() === PathType.Directory) {
        const next = parsedPath.append(curr.name);

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

  if (walked.length > 0 && untilFunc !== undefined) {
    walked = walked.filter(x => untilFunc(x));
  }

  return walked;
};

export default walk;
