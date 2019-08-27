import { parse, join } from "path";
import { existsSync, lstatSync, Stats, readdirSync, Dirent } from "fs";
import { FlexiPath, PathType, ParentQuery, SubDirectoryQuery } from "./types";

export const flexiPath = (path: string): FlexiPath => {
  const up = "../";
  const { root, dir, ext, base, name } = parse(path);
  const isRoot = () => ["./", "/"].find(x => x === path) !== undefined;
  const exists = () => existsSync(path);
  const stats = (): Stats | null => (exists() && lstatSync(path)) || null;
  const type = (): PathType => {
    const stat = stats();

    return (
      (stat && stat.isDirectory() && PathType.Directory) ||
      (stat && stat.isFile() && PathType.File) ||
      PathType.Unknown
    );
  };

  const readdir = (): Dirent[] =>
    (exists() &&
      type() === PathType.Directory &&
      readdirSync(path, { withFileTypes: true })) ||
    [];

  const parentPath = (): string => join(path, up);
  const parent: ParentQuery = (numberOfLevels?: any): any => {
    if (isRoot()) {
      return null;
    }

    const levelsToNavigate = ((numberOfLevels as number) || 1) - 1;

    let current = flexiPath(parentPath());

    // eslint-disable-next-line
    for (let i = 0; i < levelsToNavigate; i++) {
      current = current.parent();
      if (current === null || current.isRoot()) {
        break;
      }
    }
    return current;
  };

  const subDirectories: SubDirectoryQuery = (directoryName?: any): any => {
    if (directoryName === undefined) {
      return readdir()
        .filter(x => x.isDirectory())
        .map(x => flexiPath(join(path, x.name)));
    }

    return flexiPath(join(path, directoryName));
  };

  const files = (): FlexiPath[] =>
    readdir()
      .filter(x => x.isFile())
      .map(x => flexiPath(join(path, x.name)));

  const api: FlexiPath = {
    root,
    dir,
    ext,
    base,
    name,
    path,
    isRoot,
    exists,
    type,
    parent,
    subDirectories,
    files
  };

  return api;
};

export const Root = () => flexiPath("/");

export default flexiPath;
