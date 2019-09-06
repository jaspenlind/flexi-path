import { join } from "path";

import { Path, SubDirectoryQuery } from "..";
import { parse, readDir } from "./path";
/**
 * The sub directories of the `path` and a `path` builder
 * @category path
 * @param path The current `path`
 */
const subDirectories = (path: Path): SubDirectoryQuery => (
  directoryName?: any
): any => {
  const parsed = parse(path);
  if (directoryName === undefined) {
    return readDir(parsed)
      .filter(x => x.isDirectory())
      .map(x => parse(join(parsed.path, x.name)));
  }

  return parse(join(parsed.path, directoryName));
};

export default subDirectories;
