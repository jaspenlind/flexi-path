import { join } from "path";
import flexi, { FlexiPath, SubDirectoryQuery, path as pathHelper } from ".";

/**
 * The sub directories of the `path` and a `path` builder
 * @param path The current `path`
 */
export const subDirectories = (path: string | FlexiPath): SubDirectoryQuery => (
  directoryName?: any
): any => {
  const pathAsString = typeof path === "object" ? path.path : path;
  if (directoryName === undefined) {
    return pathHelper(pathAsString)
      .readDir()
      .filter(x => x.isDirectory())
      .map(x => flexi.path(join(pathAsString, x.name)));
  }

  return flexi.path(join(pathAsString, directoryName));
};

export default subDirectories;
