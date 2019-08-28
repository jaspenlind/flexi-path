import { parse } from "path";
import subDirectories from "./subDirectories";

import { FlexiPath, files } from ".";
import parent from "./parent";
import pathHelper from "./path";

export const flexiPath = (path: string): FlexiPath => {
  const { root, dir, ext, base, name } = parse(path);
  const getParent = parent(path);
  const getSubDirectories = subDirectories(path);
  const currentPath = pathHelper(path);

  const api: FlexiPath = {
    root,
    dir,
    ext,
    base,
    name,
    path,
    isRoot: () => currentPath.isRoot(),
    exists: () => currentPath.exists(),
    type: () => currentPath.type(),
    parent: (numberOfLevels?: any): any => getParent(numberOfLevels),
    subDirectories: (directoryName?: any): any =>
      getSubDirectories(directoryName),
    files: () => files(path)
  };

  return api;
};

export const Root = () => flexiPath("/");

export default flexiPath;
