import { parse, normalize } from "path";
import {
  FlexiPath,
  files,
  subDirectories,
  parent,
  path as pathHelper
} from ".";

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
    type: () => currentPath.type(),
    parent: (numberOfLevels?: any): any => getParent(numberOfLevels),
    subDirectories: (directoryName?: any): any =>
      getSubDirectories(directoryName),
    files: () => files(normalizedPath)
  };

  return api;
};

export default flexiPath;
