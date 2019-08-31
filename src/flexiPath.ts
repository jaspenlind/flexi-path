import { parse, normalize } from "path";
import {
  FlexiPath,
  Path,
  files,
  subDirectories,
  parent,
  path as pathHelper
} from ".";

/**
 * Creates a new `flexi`.`path`
 *
 * @param path A `string` representation of a valid file path or any arbitrary path
 */
export const flexiPath = (path: string): FlexiPath => {
  const normalizedPath = normalize(path);
  const { root, dir, ext, base, name } = parse(normalizedPath);
  const getParent = parent(normalizedPath);
  const getSubDirectories = subDirectories(normalizedPath);
  const currentPath = pathHelper(normalizedPath);

  const api: FlexiPath = {
    root,
    dir,
    ext,
    base,
    name,
    path: normalizedPath,
    isRoot: () => currentPath.isRoot(),
    exists: () => currentPath.exists(),
    isEmpty: () => currentPath.isEmpty(),
    isValid: () => currentPath.isValid(),
    type: () => currentPath.type(),
    parent: (numberOfLevels?: any): any => getParent(numberOfLevels),
    subDirectories: (directoryName?: any): any =>
      getSubDirectories(directoryName),
    files: () => files(normalizedPath),
    append: (...paths: Path[]) => currentPath.concat(...paths),
    write: () => currentPath.write()
  };

  return api;
};

export default flexiPath;
