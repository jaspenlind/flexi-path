import { join } from "path";
import { SubDirectoryQuery, path as pathHelper, parse, Path } from ".";

/**
 * The sub directories of the `path` and a `path` builder
 * @param path The current `path`
 */
export const subDirectories = (path: Path): SubDirectoryQuery => (
  directoryName?: any
): any => {
  const parsed = parse(path);
  if (directoryName === undefined) {
    return pathHelper(parsed)
      .readDir()
      .filter(x => x.isDirectory())
      .map(x => parse(join(parsed.path, x.name)));
  }

  return parse(join(parsed.path, directoryName));
};

export default subDirectories;
